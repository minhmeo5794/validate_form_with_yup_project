import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import './App.scss'
import checked from './images/checked.png'

const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Email must be valid email address").required("Email is required"),
    age: yup.number().positive("Age is positive number").integer("Age is integer number").required("Email is required"),
    password: yup.string().required("Password is required").min(6, "Password must be at least 6 characters").max(10, "Password must be at most 10 characters"),
    comfirmPassword: yup.string().required("Confirm Password is required").oneOf([yup.ref("password"), null]),
})

function App() {
	const [submit, setSubmit] = useState(false)
	const { register, handleSubmit, formState: { errors } } = useForm({
		resolver: yupResolver(schema)
    })

	const onSubmit = (data) => {
		console.log(data)
		setSubmit(true)
	}
	console.log('Errors!!: ', errors)

	return (
		<div className="app">
			<div className="app-wrapper">
				<div className="RHF-field">
					<div className="svg-field">
						<svg fill="#fff" viewBox="0 0 100 100">
							<path
								d="M73.56,13.32H58.14a8.54,8.54,0,0,0-16.27,0H26.44a11,11,0,0,0-11,11V81.63a11,11,0,0,0,11,11H73.56a11,11,0,0,0,11-11V24.32A11,11,0,0,0,73.56,13.32Zm-30.92,2a1,1,0,0,0,1-.79,6.54,6.54,0,0,1,12.78,0,1,1,0,0,0,1,.79h5.38v6.55a3,3,0,0,1-3,3H40.25a3,3,0,0,1-3-3V15.32ZM82.56,81.63a9,9,0,0,1-9,9H26.44a9,9,0,0,1-9-9V24.32a9,9,0,0,1,9-9h8.81v6.55a5,5,0,0,0,5,5h19.5a5,5,0,0,0,5-5V15.32h8.81a9,9,0,0,1,9,9Z"
							></path>
							<path className="path-x" d="M71.6,45.92H54a1,1,0,0,0,0,2H71.6a1,1,0,0,0,0-2Z"></path>
							<path d="M71.6,45.92H54a1,1,0,0,0,0,2H71.6a1,1,0,0,0,0-2Z"></path>
							<path className="path-x" d="M71.1,69.49H53.45a1,1,0,1,0,0,2H71.1a1,1,0,0,0,0-2Z"></path>
							<path d="M71.1,69.49H53.45a1,1,0,1,0,0,2H71.1a1,1,0,0,0,0-2Z"></path>
						</svg>
					</div>
					<h2 className="svg-name">React Hook Form</h2>
				</div>
				{submit ? (
					<div className="RHF-success">
						<h2 className="title-success">Success</h2>
						<img src={checked} alt="checked" />
					</div>
				) : (
					<div className="form-field-wrap">
						<form className="form-field" onSubmit={handleSubmit(onSubmit)}>
							<div className="input_field">
								<input
									type="text"
									name="name"
									placeholder="Name"
									{...register("name")}
								/>
							</div>
							<p className="errors_message">{errors.name?.message}</p>
	
							<div className="input_field">
								<input
									type="text"
									name="email"
									placeholder="Email"
									{...register("email")}
								/>
							</div>
							<p className="errors_message">{errors.email?.message}</p>
	
							<div className="input_field">
								<input
									type="text"
									name="age"
									placeholder="Age"
									{...register("age")}
								/>
							</div>
							<p className="errors_message">{errors.age?.type === "typeError" ? "Age must be a number" : errors.age?.message}</p>
	
							<div className="input_field">
								<input
									type="password"
									name="password"
									placeholder="Password"
									{...register("password")}
								/>
							</div>
							<p className="errors_message">{errors.password?.message}</p>
	
							<div className="input_field">
								<input
									type="password"
									name="comfirmPassword"
									placeholder="Comfirm Password"
									{...register("comfirmPassword")}
								/>
							</div>
							<p className="errors_message">{errors.comfirmPassword?.type === "oneOf" ? "Password do not match" : errors.comfirmPassword?.message}</p>
	
							<div className="input_field input_field-submit" >
								<button type="submit">
									Submit
								</button>
							</div>
						</form>
					</div>
				)}
			</div>
		</div>
	)
}

export default App
