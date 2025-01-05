import { FormikValues, useFormik } from "formik";
import { FunctionComponent } from "react";
import * as yup from "yup";
import { createCard, createNewCard } from "../../services/cardsServices";
import CardsInput from "./CardsInput";
import { Cards } from "../../interface/Crards";
import { errorMsg, successMsg } from "../../services/toastify";
import { FaPlus } from "react-icons/fa";
import { cardsInitialValues } from "./cardsInitialValues";

interface AddNewCardFormProps {
	onHide: Function;

	refresh: Function
}

const AddNewCardForm: FunctionComponent<AddNewCardFormProps> = ({ refresh, onHide }) => {
	const formik: FormikValues = useFormik({
		initialValues: cardsInitialValues,
		validationSchema: yup.object({
			title: yup.string().required().min(2),
			subtitle: yup.string().required().min(2),
			description: yup.string().required().min(2),
			phone: yup.string().required("Phone number is required").matches(/^05\d{8}$/, "Phone number must be a valid Israeli number"),
			email: yup
				.string()
				.required("Email is required")
				.email("Must be a valid email address").matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "email most be a valid email address"),
			web: yup.string().min(14),
			image: yup.object({
				url: yup.string().url("Must be a valid URL"),
				alt: yup.string(),
			}),
			address: yup.object({
				state: yup.string(),
				country: yup.string().required("Country is required"),
				city: yup.string().required("City is required"),
				street: yup.string().required("Street is required"),
				houseNumber: yup.number().required("House number is required").min(0, "House number must be positive"),
				zip: yup.number(),
			}),
		}),
		onSubmit: (values: Cards) => {
			createCard(values).then(() => {
				successMsg("Your business card as been added successfuly now everyone can see it :)");
				onHide()
			}
			).catch(() => errorMsg('oops something went wrong try again')
			)
		}

	})

	return (
		<div className='container mt-5'>
			<form
				onSubmit={formik.handleSubmit}
				className='fw-bold card p-4 shadow-lg rounded-3'
			>
				{/* Title and Subtitle */}
				<div className='row'>
					<div className='col-6'>
						<CardsInput
							placeholder='Title'
							name='title'
							type='text'
							value={formik.values.title}
							error={formik.errors.title}
							touched={formik.touched.title}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
					</div>
					<div className='col-6'>
						<CardsInput
							placeholder='Subtitle'
							name='subtitle'
							type='text'
							value={formik.values.subtitle}
							error={formik.errors.subtitle}
							touched={formik.touched.subtitle}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
					</div>
				</div>

				{/* Description */}
				<CardsInput
					placeholder='Card description'
					name='description'
					type='text'
					value={formik.values.description}
					error={formik.errors.description}
					touched={formik.touched.description}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
				/>

				{/* Phone and Email */}
				<div className='row'>
					<div className='col-6'>
						<CardsInput
							placeholder='Phone (9-11)'
							name='phone'
							type='tel'
							value={formik.values.phone}
							error={formik.errors.phone}
							touched={formik.touched.phone}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
					</div>
					<div className='col-6'>
						<CardsInput
							placeholder='Email'
							name='email'
							type='email'
							value={formik.values.email}
							error={formik.errors.email}
							touched={formik.touched.email}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
					</div>
				</div>

				{/* Website URL */}
				<CardsInput
					placeholder='Website url '
					name='web'
					type='url'
					value={formik.values.web}
					error={formik.errors.web}
					touched={formik.touched.web}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
				/>

				{/* Image URL and Alt */}
				<div className='row'>
					<div className='col-8'>
						<CardsInput
							placeholder='image Url'
							name='image.url'
							type='url'
							value={formik.values.image.url}
							error={formik.errors.image?.url}
							touched={formik.touched.image?.url}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
					</div>
					<div className='col-4'>
						<CardsInput
							placeholder='img name'
							name='image.alt'
							type='text'
							value={formik.values.image.alt}
							error={formik.errors.image?.alt}
							touched={formik.touched.image?.alt}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
					</div>
				</div>

				{/* Address Fields */}
				<div className='row'>
					<div className='col-4'>
						<CardsInput
							placeholder='state'
							name='address.state'
							type='text'
							value={formik.values.address.state}
							error={formik.errors.address?.state}
							touched={formik.touched.address?.state}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
					</div>
					<div className='col-4'>
						<CardsInput
							placeholder='country'
							name='address.country'
							type='text'
							value={formik.values.address.country}
							error={formik.errors.address?.country}
							touched={formik.touched.address?.country}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
					</div>
					<div className='col-4'>
						<CardsInput
							placeholder='city'
							name='address.city'
							type='text'
							value={formik.values.address.city}
							error={formik.errors.address?.city}
							touched={formik.touched.address?.city}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
					</div>
				</div>

				{/* Street, House Number, Zip */}
				<div className='row'>
					<div className='col-4'>
						<CardsInput
							placeholder='street'
							name='address.street'
							type='text'
							value={formik.values.address.street}
							error={formik.errors.address?.street}
							touched={formik.touched.address?.street}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
					</div>
					<div className='col-4'>
						<CardsInput
							placeholder='houseNumber'
							name='address.houseNumber'
							type='number'
							value={formik.values.address.houseNumber}
							error={formik.errors.address?.houseNumber}
							touched={formik.touched.address?.houseNumber}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
					</div>
					<div className='col-4'>
						<CardsInput
							placeholder='zip'
							name='address.zip'
							type='number'
							value={formik.values.address.zip}
							error={formik.errors.address?.zip}
							touched={formik.touched.address?.zip}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
					</div>
				</div>

				<div className='mb-3'>
					<button
						type='submit'
						className='btn btn-success w-100 py-2 fw-bold shadow-lg'
					>
						<FaPlus />
					</button>
				</div>
			</form>
		</div>
	);
};

export default AddNewCardForm;
