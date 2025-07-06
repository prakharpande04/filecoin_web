
import React from 'react';
import { Bot, Zap, Shield, Globe } from 'lucide-react';

const VisionSection = () => {
  return (
    <section id="vision" className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Vision
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Revolutionizing Filecoin transactions through intelligent AI automation
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-gray-900">
              Automating Filecoin with AI
            </h3>
            <p className="text-lg text-gray-600">
              At Mosaia, we envision a future where Filecoin transactions are seamlessly automated 
              through intelligent AI agents. Our cutting-edge technology eliminates complexity, 
              reduces manual intervention, and ensures optimal efficiency in decentralized storage operations.
            </p>
            <p className="text-lg text-gray-600">
              By leveraging advanced machine learning algorithms, our AI agents can predict, 
              optimize, and execute Filecoin transactions with unprecedented accuracy and speed.
            </p>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur-xl opacity-20"></div>
            <div className="relative bg-white rounded-2xl p-8 shadow-xl">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-6 mx-auto">
                <Bot className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-center mb-4">AI-Powered Automation</h4>
              <p className="text-gray-600 text-center">
                Smart contracts meet artificial intelligence for autonomous Filecoin operations
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4 mx-auto">
              <Zap className="w-6 h-6 text-blue-600" />
            </div>
            <h4 className="text-xl font-semibold mb-3">Lightning Fast</h4>
            <p className="text-gray-600">
              Execute Filecoin transactions in milliseconds with AI-optimized pathways
            </p>
          </div>

          <div className="text-center p-6">
            <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-4 mx-auto">
              <Shield className="w-6 h-6 text-purple-600" />
            </div>
            <h4 className="text-xl font-semibold mb-3">Secure & Reliable</h4>
            <p className="text-gray-600">
              Advanced security protocols ensure safe and trustworthy automated transactions
            </p>
          </div>

          <div className="text-center p-6">
            <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4 mx-auto">
              <Globe className="w-6 h-6 text-green-600" />
            </div>
            <h4 className="text-xl font-semibold mb-3">Global Scale</h4>
            <p className="text-gray-600">
              Scalable AI infrastructure supporting worldwide Filecoin network operations
            </p>
          </div>
        </div>

        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              The Future is Autonomous
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              Join us in building the next generation of decentralized storage solutions where 
              AI agents handle complex Filecoin operations automatically, allowing you to focus 
              on what matters most - your data and applications.
            </p>
            <div className="flex items-center justify-center space-x-4">
              <img 
                src="/lovable-uploads/ebeb4cfa-424b-4818-b98d-d790d253756f.png" 
                alt="Filecoin" 
                className="h-8" 
              />
              <span className="text-2xl text-gray-400">+</span>
              <img 
                src="/lovable-uploads/b010353b-0f9f-4e67-af61-d562dcb48486.png" 
                alt="Mosaia" 
                className="h-8" 
              />
              <span className="text-2xl text-gray-400">=</span>
              <Bot className="w-8 h-8 text-blue-500" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionSection;
