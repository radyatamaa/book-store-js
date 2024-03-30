import { IOrderRepository } from '../../repositories/order/orderRepository';
import { ICustomerRepository } from '../../repositories/customer/customerRepository';
import { IBooksRepository } from '../../repositories/books/booksRepository';
import { validateOrder } from '../../model-validations/order';
import { IOrderEntityAttributes } from '../../entities/order';
import { ClientError } from '../../errors/clientError';
import { ICustomerEntityAttributes } from '../../entities/customer';
import { IBookEntityAttributes } from '../../entities/book';

export type ICancelOrder = (id: number) => Promise<any>;

export const buildCancelOrder = ({
	orderRepository,
	customerRepository,
	booksRepository,
}: {
	orderRepository: IOrderRepository;
	customerRepository: ICustomerRepository;
	booksRepository: IBooksRepository;
}): ICancelOrder => {
	return async (id) => {

        const orderData = await orderRepository.findById(id);
        if (!orderData) {
            throw new ClientError('orderData not found', 400);
        }
        
        const orderAttributes = orderData.get() as IOrderEntityAttributes;

        let customer = await customerRepository.findById(orderAttributes.customerId);
		if (!customer) {
			throw new ClientError('customer not found', 400);
		}

        await orderRepository.deleteData(id);

        const customerAttributes = customer.get() as ICustomerEntityAttributes;
        customerAttributes.points = customerAttributes.points + orderAttributes.total_price;
        
		await customerRepository.update(customerAttributes,orderAttributes.customerId);

		return id
	};
};
