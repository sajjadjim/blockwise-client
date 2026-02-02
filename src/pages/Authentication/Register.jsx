import React from 'react';
import { useForm } from 'react-hook-form';

import { Link, useNavigate } from 'react-router';
import axios from 'axios';
import toast from 'react-hot-toast';

import useAuth from '../../hooks/useAuth';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { createUser } = useAuth();
  const navigate = useNavigate();

const onSubmit = async (data) => {
  try {
    const result = await createUser(data.email, data.password);
    const loggedUser = result.user;

    // Save user to DB
    const savedUser = {
      name: data.name,
      email: data.email,
      photoURL: data.photoURL
    };

    await axios.post('https://blockwise-server.vercel.app/users', savedUser); // ✅ await added

    toast.success('Registration successful. Please login.');
    navigate('/login'); // ⬅️ move navigation after toast
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      toast.error('Email is already in use');
    } else {
      toast.error('Registration failed');
    }
    console.error(error);
  }
};


  return (
    <div>
      <Navbar></Navbar>
    <div className="card bg-base-100 w-full max-w-sm shadow-2xl mx-auto my-4">
      <div className="card-body">
        <h1 className="text-3xl font-bold text-center mb-3">Create an Account</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          {/* Name */}
          <label className="label">Name</label>
          <input
            type="text"
            {...register('name', { required: true })}
            className="input input-bordered w-full"
            placeholder="Your Name"
          />
          {errors.name && <p className="text-red-500">Name is required</p>}

          {/* Email */}
          <label className="label">Email</label>
          <input
            type="email"
            {...register('email', { required: true })}
            className="input input-bordered w-full"
            placeholder="Email"
          />
          {errors.email && <p className="text-red-500">Email is required</p>}

          {/* Photo URL */}
          <label className="label">Photo URL (optional)</label>
          <input
            type="text"
            {...register('photoURL')}
            className="input input-bordered w-full"
            placeholder="Photo URL (from imgbb)"
          />

          {/* Password */}
          <label className="label">Password</label>
          <input
            type="password"
            {...register('password', {
              required: true,
              minLength: 6,
              pattern: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/
            })}
            className="input input-bordered w-full"
            placeholder="Password"
          />
          {errors.password?.type === 'required' && <p className="text-red-500">Password is required</p>}
          {errors.password?.type === 'minLength' && <p className="text-red-500">Password must be at least 6 characters</p>}
          {errors.password?.type === 'pattern' && <p className="text-red-500">Password must have uppercase and lowercase letter</p>}

          <button className="btn btn-outline w-full mt-2">Register</button>
        </form>

        <p className="text-center mt-2">
          Already have an account? <Link to="/login" className="text-gray-900 font-semibold underline">Login</Link>
        </p>

        

      </div>
    </div>
    <Footer></Footer>
    </div>

  );
};

export default Register;
