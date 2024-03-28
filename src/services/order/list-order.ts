import { IOrderRepository } from '../../repositories/order/orderRepository';

export type IListOrder = () => Promise<any>;

export const buildListOrder = ({
	orderRepository,
}: {
	orderRepository: IOrderRepository;
}): IListOrder => {
	return async () => {
		return orderRepository.findAll();
	};
};
