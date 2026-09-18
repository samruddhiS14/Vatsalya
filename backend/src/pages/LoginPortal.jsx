import React, { useState } from 'react';
import { authService } from '../services/api';

export default function LoginPortal({ onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '', role: 'CITIZEN' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      if (isLogin) {
        const user = await authService.login({ email: formData.email, password: formData.password });
        setSuccess(`Welcome back, ${user.name}!`);
        if (onLoginSuccess) onLoginSuccess(user);
      } else {
        await authService.register(formData);
        setSuccess('Registration successful! You can now log in.');
        setIsLogin(true);
      }
    } catch (err) {
      setError(err.message || 'An error occurred');
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-stone-900">
          {isLogin ? 'Sign in to Vatsalya' : 'Create an Account'}
        </h2>
        <p className="mt-2 text-center text-sm text-stone-600">Every life deserves a second chance.</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-stone-200">
          {error && <div className="mb-4 bg-red-50 text-red-700 p-3 rounded text-sm">{error}</div>}
          {success && <div className="mb-4 bg-emerald-50 text-emerald-700 p-3 rounded text-sm">{success}</div>}

          <form className="space-y-6" onSubmit={handleSubmit}>
            {!isLogin && (
              <>
                <div>
                  <label className="block text-sm font-medium text-stone-700">Full Name</label>
                  <input type="text" required value={formData.name} onChange={(e)=>setFormData({...formData, name: e.target.value})} className="mt-1 block w-full border border-stone-300 rounded-md shadow-sm p-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700">Phone Number</label>
                  <input type="text" required value={formData.phone} onChange={(e)=>setFormData({...formData, phone: e.target.value})} className="mt-1 block w-full border border-stone-300 rounded-md shadow-sm p-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700">Role</label>
                  <select value={formData.role} onChange={(e)=>setFormData({...formData, role: e.target.value})} className="mt-1 block w-full border border-stone-300 rounded-md shadow-sm p-2">
                    <option value="CITIZEN">Citizen</option>
                    <option value="RESCUER">Rescuer</option>
                    <option value="VETERINARIAN">Veterinarian</option>
                    <option value="SHELTER">Shelter Manager</option>
                    <option value="ADOPTER">Adopter</option>
                    <option value="ADMIN">Admin</option>
                  </select>
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-stone-700">Email Address</label>
              <input type="email" required value={formData.email} onChange={(e)=>setFormData({...formData, email: e.target.value})} className="mt-1 block w-full border border-stone-300 rounded-md shadow-sm p-2" />
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700">Password</label>
              <input type="password" required value={formData.password} onChange={(e)=>setFormData({...formData, password: e.target.value})} className="mt-1 block w-full border border-stone-300 rounded-md shadow-sm p-2" />
            </div>

            <div>
              <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700">
                {isLogin ? 'Sign In' : 'Register'}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <button onClick={() => setIsLogin(!isLogin)} className="text-sm text-orange-600 hover:underline">
              {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
