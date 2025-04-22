"use client";
import React, { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";

const SignInCandidate: React.FC = () => {
  const [candidateId, setCandidateId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!candidateId.trim()) {
      alert("Candidate ID cannot be empty");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      console.log("Signed in with:", { candidateId, password });
      setCandidateId("");
      setPassword("");
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-black px-4">
      <div className="w-full max-w-md p-8 rounded-3xl shadow-xl border border-white/20 bg-white/10 backdrop-blur-md transition-all duration-300 ease-in-out hover:shadow-blue-700/50 hover:scale-[1.01]">
        <h2 className="text-3xl font-bold text-white text-center mb-2 tracking-tight">
          Candidate Portal
        </h2>
        <p className="text-center text-gray-300 mb-8">
          Secure sign-in to vote and manage details
        </p>

        <form onSubmit={handleSignIn} className="space-y-5">
          <div className="relative">
            <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="number"
              placeholder="Candidate ID"
              value={candidateId}
              onChange={(e) => setCandidateId(e.target.value)}
              disabled={loading}
              className="w-full py-3 pl-12 pr-4 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>

          <div className="relative">
            <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              required
              className="w-full py-3 pl-12 pr-4 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold text-white transition-all duration-300 ${
              loading
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 shadow-md hover:shadow-indigo-500/50"
            }`}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignInCandidate;
