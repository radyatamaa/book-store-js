import { ICustomerRepository } from '../../repositories/customer/customerRepository';
import { validateCustomer } from '../../model-validations/customer';
import { ICustomerEntityAttributes } from '../../entities/customer';

export type IAddCustomer = (body: ICustomerEntityAttributes) => Promise<any>;

export const buildAddCustomer = ({
	customerRepository,
}: {
	customerRepository: ICustomerRepository;
}): IAddCustomer => {
	return async body => {
		const customerData = validateCustomer(body);
		return customerRepository.create({
			name: customerData.name,
			points: customerData.points,
		});
	};
};
