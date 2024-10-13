import React, { useState, useEffect } from 'react';
import { Send } from 'lucide-react';

interface ResponseStruct {
  query: string;
  response: string;
}

function useTypingEffect(text: string, speed: number = 50) {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let i = 0;
    setDisplayedText('');
    const typingInterval = setInterval(() => {
      if (i < text.length) {
        setDisplayedText((prev) => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, speed);

    return () => clearInterval(typingInterval);
  }, [text, speed]);

  return displayedText;
}

function App() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState<ResponseStruct | null>(null);
  const [loading, setLoading] = useState(false);

  const displayedResponse = useTypingEffect(response?.response || '', 30);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setResponse(null);

    // Simulating API call to your LLM model
    // Replace this with your actual API call
    try {
      // In a real scenario, you'd make an API call here
      await new Promise(resolve => setTimeout(resolve, 1000));
   
      const mockResponse: ResponseStruct = {
        query: query,
        response: `This is a mock response to your query: "${query}". It's designed to be a bit longer to showcase the typing animation effect. Feel free to ask more questions!`,
      };
      setResponse(mockResponse);
    } catch (error) {
      console.error('Error fetching response:', error);
      // Handle error (e.g., show error message to user)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900">ChatGPT-like UI</h1>
        </div>
      </header>
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="mb-8">
            <div className="flex">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter your query..."
                className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-300"
                disabled={loading || !query.trim()}
              >
                {loading ? 'Thinking...' : <Send size={20} />}
              </button>
            </div>
          </form>
          {(response || loading) && (
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <p className="text-sm text-gray-900">
                  {loading ? 'Thinking...' : displayedResponse}
                  {!loading && displayedResponse.length < (response?.response.length || 0) && (
                    <span className="inline-block w-1 h-4 bg-gray-900 ml-1 animate-blink"></span>
                  )}
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;