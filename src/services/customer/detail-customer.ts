import { ICustomerRepository } from '../../repositories/customer/customerRepository';

export type IDetailCustomer = (id: number) => Promise<any>;

export const buildDetailCustomer = ({
	customerRepository,
}: {
	customerRepository: ICustomerRepository;
}): IDetailCustomer => {
	return async id => {
		return customerRepository.findById(id);
	};
};
