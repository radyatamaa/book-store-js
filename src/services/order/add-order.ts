import { IOrderRepository } from '../../repositories/order/orderRepository';
import { validateOrder } from '../../model-validations/order';
import { IOrderEntityAttributes } from '../../entities/order';

export type IAddOrder = (body: IOrderEntityAttributes) => Promise<any>;

export const buildAddOrder = ({
	orderRepository,
}: {
	orderRepository: IOrderRepository;
}): IAddOrder => {
	return async body => {
		const orderData = validateOrder(body);
		return orderRepository.create({
			customerId: orderData.customerId,
			bookId: orderData.bookId,
			quantity: orderData.quantity,
			order_date: orderData.order_date,
		});
	};
};
