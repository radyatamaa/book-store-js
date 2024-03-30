import { IOrderRepository } from '../../repositories/order/orderRepository';

export type IListOrder = (query: {page:number,limit: number,customerId:number}) => Promise<any>;

export const buildListOrder = ({
	orderRepository,
}: {
	orderRepository: IOrderRepository;
}): IListOrder => {
	return async (query) => {
		let page = 1;
		let limit = 5;
		if (query.limit > 0) {
			page = query.page
			limit = query.limit
		}
		const orderList = await orderRepository.findWithPagination(page,limit,query.customerId);

		return orderList;
	};
};
