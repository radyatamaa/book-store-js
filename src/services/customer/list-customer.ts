import { ICustomerRepository } from '../../repositories/customer/customerRepository';

export type IListCustomer = () => Promise<any>;

export const buildListCustomer = ({
	customerRepository,
}: {
	customerRepository: ICustomerRepository;
}): IListCustomer => {
	return async () => {
		return customerRepository.findAll();
	};
};
