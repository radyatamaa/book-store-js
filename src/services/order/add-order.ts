import { IOrderRepository } from '../../repositories/order/orderRepository';
import { ICustomerRepository } from '../../repositories/customer/customerRepository';
import { IBooksRepository } from '../../repositories/books/booksRepository';
import { validateOrder } from '../../model-validations/order';
import { IOrderEntityAttributes } from '../../entities/order';
import { ClientError } from '../../errors/clientError';
import { ICustomerEntityAttributes } from '../../entities/customer';
import { IBookEntityAttributes } from '../../entities/book';

export type IAddOrder = (body: IOrderEntityAttributes) => Promise<any>;

export const buildAddOrder = ({
	orderRepository,
	customerRepository,
	booksRepository,
}: {
	orderRepository: IOrderRepository;
	customerRepository: ICustomerRepository;
	booksRepository: IBooksRepository;
}): IAddOrder => {
	return async body => {
		const orderData = validateOrder(body);
		let customer = await customerRepository.findById(orderData.customerId);
		if (!customer) {
			throw new ClientError('customer not found', 400);
		}

		const customerAttributes = customer.get() as ICustomerEntityAttributes;
		const points = (customerAttributes as ICustomerEntityAttributes).points;
		
		const book = await booksRepository.findById(orderData.bookId);
		if (!book) {
			throw new ClientError('book not found', 400);
		}

		const bookAttributes = book.get() as IBookEntityAttributes;
		const price = (bookAttributes as IBookEntityAttributes).price;

		const totalPrice = price * orderData.quantity;
		if (totalPrice > points) {
			throw new ClientError('your points are not enough to order', 400);
		}

		const createOrder = await orderRepository.create({
			customerId: orderData.customerId,
			bookId: orderData.bookId,
			quantity: orderData.quantity,
			order_date: orderData.order_date,
			book_data: JSON.stringify(book)
		});

		customerAttributes.points = customerAttributes.points - totalPrice;
		await customerRepository.update(customerAttributes,orderData.customerId);

		return createOrder
	};
};
