import React, { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/inertia-react';
import { useContext } from 'react';
import { LangContext } from '../../Context/LangContext';

export default function Register() {
  const {lang} = useContext(LangContext); 

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    console.log(errors)

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('register'));
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <form onSubmit={submit}>
                <div>
                    <InputLabel forInput="name" value="Name" />

                    <TextInput
                        type="text"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        handleChange={onHandleChange}
                        required
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel forInput="email" value="Email" />

                    <TextInput
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        handleChange={onHandleChange}
                        required
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel forInput="password" value="Password" />

                    <TextInput
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        handleChange={onHandleChange}
                        required
                    />
                    {
                      errors.password && errors.password == 'The password confirmation does not match.' &&
                      <InputError message={lang.get('validation.confirmed')} className="mt-2" />
                    }
                    {
                      errors.password && errors.password == 'The password must be at least 8 characters.' &&
                      <InputError message={lang.get('validation.min.string')} className="mt-2" />
                    }
                    {
                      errors.password && errors.password !== 'The password confirmation does not match.' && errors.password !== 'The password must be at least 8 characters.' &&
                      <InputError message={errors.password} className="mt-2" />
                    }

                   
                    
                </div>

                <div className="mt-4">
                    <InputLabel forInput="password_confirmation" value="Confirm Password" />

                    <TextInput
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        handleChange={onHandleChange}
                        required
                    />

                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <Link href={route('login')} className="underline text-sm text-gray-600 hover:text-gray-900">
                        Already registered?
                    </Link>

                    <PrimaryButton className="ml-4" processing={processing}>
                        Register
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
































// import React, { useEffect } from 'react';
// import Button from '@/Components/Button';
// import Guest from '@/Layouts/Guest';
// import Input from '@/Components/Input';
// import Label from '@/Components/Label';
// import ValidationErrors from '@/Components/ValidationErrors';
// import { Head, Link, useForm } from '@inertiajs/inertia-react';
// import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';
// import { useState } from 'react';

// export default function Register() {
//     const { data, setData, post, processing, errors, reset } = useForm({
//         name: '',
//         email: '',
//         password: '',
//         password_confirmation: '',
//     });
    
//     const [captcha, setCaptcha] = useState('');
//     const [errorCaptcha, setErrorCaptcha] = useState('');

//     useEffect(() => {
//         return () => {
//             reset('password', 'password_confirmation');
//         };
//     }, []);

//     useEffect(() => {
//       loadCaptchaEnginge(6); 
//     }, [])

//     const onHandleChange = (event) => {
//         setData(event.target.name, event.target.type == 'checkbox' ? event.target.checked : event.target.value);
//     };

//     const submit = (e) => {
//         e.preventDefault();       

//         if (validateCaptcha(captcha) == true) {
//           post(route('register'));
//         } else {
//           setErrorCaptcha('error captcha')
//         }       
//     };

//     return (
//         <Guest>
//             {/* <Head title="Register" /> */}

//             {/* <ValidationErrors errors={errors} /> */}

//             <form onSubmit={submit}>
//                 <div>
//                     <Label forInput="name" value="Name" />

//                     <Input
//                         // id="register_captcha_input"
//                         type="text"
//                         name="name"
//                         value={data.name}
//                         className="mt-1 block w-full"
//                         autoComplete="name"
//                         isFocused={true}
//                         handleChange={onHandleChange}
//                         required
//                     />
//                 </div>

//                 <div className="mt-4">
//                     <Label forInput="email" value="Email" />

//                     <Input
//                         type="email"
//                         name="email"
//                         value={data.email}
//                         className="mt-1 block w-full"
//                         autoComplete="username"
//                         handleChange={onHandleChange}
//                         required
//                     />
//                 </div>

//                 <div className="mt-4">
//                     <Label forInput="password" value="Password" />

//                     <Input
//                         type="password"
//                         name="password"
//                         value={data.password}
//                         className="mt-1 block w-full"
//                         autoComplete="new-password"
//                         handleChange={onHandleChange}
//                         required
//                     />
//                 </div>

//                 <div className="mt-4">
//                     <Label forInput="password_confirmation" value="Confirm Password" />

//                     <Input
//                         type="password"
//                         name="password_confirmation"
//                         value={data.password_confirmation}
//                         className="mt-1 block w-full"
//                         handleChange={onHandleChange}
//                         required
//                     />
//                 </div>

//                 <div className='mt-4'>
//                   <LoadCanvasTemplate />
//                 </div>                

//                 <div className='mt-4'>
//                   <Label forInput="captcha" value="Enter Captcha" />
//                   <input
//                       type="text"
//                       name="captcha"
//                       value={captcha}
//                       className="mt-1 block w-full"
//                       onChange={(e) => setCaptcha(e.target.value)}
//                       required
//                   />
//                   <small className='text-red-800'>{errorCaptcha}</small>
//                 </div>

//                 <div className="flex items-center justify-end mt-4">
//                     <Link href={route('login')} className="underline text-sm text-gray-600 hover:text-gray-900">
//                         Already registered?
//                     </Link>

//                     <Button className="ml-4" processing={processing}>
//                         Register
//                     </Button>
//                 </div>
//             </form>
//         </Guest>
//     );
// }
