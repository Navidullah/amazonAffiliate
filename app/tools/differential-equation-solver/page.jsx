"use client";

import { useState } from "react";
import axios from "axios";
import { BlockMath } from "react-katex";

export default function DifferentialEquationSolver() {
  const [equation, setEquation] = useState("");
  const [solution, setSolution] = useState("");
  const [latex, setLatex] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [graph, setGraph] = useState("");
  const [steps, setSteps] = useState([]);
  const [history, setHistory] = useState([]);

  const examples = [
    "x + y(x)",
    "sin(x) + y(x)",
    "x**2 + y(x)",
    "exp(x) + y(x)",
  ];

  const solveEquation = async () => {
    if (!equation) return;

    try {
      setLoading(true);
      setError("");

      setSolution("");
      setLatex("");
      setGraph("");
      setSteps([]);

      const response = await axios.post("http://127.0.0.1:8000/solve", {
        rhs: equation,
      });

      if (response.data.error) {
        setError(response.data.error);
        return;
      }

      setSolution(response.data.solution);
      setLatex(response.data.latex);
      setGraph(response.data.graph);
      setSteps(response.data.steps);

      setHistory((prev) => [equation, ...prev.slice(0, 4)]);
    } catch (err) {
      setError("Unable to solve this equation");
    } finally {
      setLoading(false);
    }
  };

  const copySolution = async () => {
    try {
      await navigator.clipboard.writeText(solution);

      alert("Solution copied successfully!");
    } catch (err) {
      console.log(err);
    }
  };

  const downloadSolution = () => {
    const content = `
Differential Equation Solver

Equation:
${equation}

Solution:
${solution}
`;

    const blob = new Blob([content], {
      type: "text/plain",
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = "solution.txt";

    a.click();

    URL.revokeObjectURL(url);
  };

  const clearAll = () => {
    setEquation("");
    setSolution("");
    setLatex("");
    setGraph("");
    setSteps([]);
    setError("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 p-6">
      <div className="max-w-7xl mx-auto">
        {/* HERO */}

        <div className="bg-black text-white rounded-3xl p-10 shadow-2xl mb-10">
          <h1 className="text-5xl font-bold mb-4 text-center">
            Differential Equation Solver
          </h1>

          <p className="text-center text-gray-300 text-lg max-w-3xl mx-auto">
            Solve ordinary differential equations instantly with symbolic
            computation, step-by-step explanations, and graph visualization.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* MAIN SECTION */}

          <div className="lg:col-span-2 bg-white rounded-3xl shadow-2xl p-8">
            <div className="bg-gray-100 rounded-2xl p-4 text-center text-2xl font-semibold mb-6">
              dy/dx = ?
            </div>

            <input
              type="text"
              placeholder="Example: x + y(x)"
              value={equation}
              onChange={(e) => setEquation(e.target.value)}
              className="w-full border border-gray-300 rounded-2xl p-4 text-lg outline-none focus:ring-2 focus:ring-black mb-6"
            />

            {/* BUTTONS */}

            <div className="flex flex-wrap gap-4 mb-6">
              <button
                onClick={solveEquation}
                className="bg-black text-white px-6 py-4 rounded-2xl hover:opacity-90 transition"
              >
                {loading ? "Solving..." : "Solve Equation"}
              </button>

              <button
                onClick={clearAll}
                className="bg-gray-200 px-6 py-4 rounded-2xl hover:bg-gray-300 transition"
              >
                Clear
              </button>
            </div>

            {/* LOADING */}

            {loading && (
              <div className="mt-8 flex justify-center">
                <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}

            {/* ERROR */}

            {error && (
              <div className="mt-6 bg-red-100 text-red-600 p-4 rounded-2xl text-center">
                {error}
              </div>
            )}

            {/* SOLUTION */}

            {latex && (
              <div className="mt-10">
                <div className="flex flex-wrap gap-4 items-center justify-between mb-4">
                  <h2 className="text-3xl font-bold">Solution</h2>

                  <div className="flex gap-3">
                    <button
                      onClick={copySolution}
                      className="bg-black text-white px-4 py-2 rounded-xl hover:opacity-90 transition"
                    >
                      Copy
                    </button>

                    <button
                      onClick={downloadSolution}
                      className="bg-gray-200 px-4 py-2 rounded-xl hover:bg-gray-300 transition"
                    >
                      Download
                    </button>
                  </div>
                </div>

                <div className="bg-gray-100 rounded-2xl p-8 overflow-x-auto shadow-inner">
                  <BlockMath math={latex} />
                </div>
              </div>
            )}

            {/* STEPS */}

            {steps.length > 0 && (
              <div className="mt-12">
                <h2 className="text-3xl font-bold mb-6">
                  Step-by-Step Solution
                </h2>

                <div className="space-y-6">
                  {steps.map((step, index) => (
                    <div
                      key={index}
                      className="bg-gray-100 rounded-2xl p-6 shadow-sm"
                    >
                      <h3 className="text-xl font-bold mb-4">
                        Step {index + 1}: {step.title}
                      </h3>

                      <div className="overflow-x-auto">
                        <BlockMath math={step.latex} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* GRAPH */}

            {graph && (
              <div className="mt-12">
                <h2 className="text-3xl font-bold mb-6">Solution Graph</h2>

                <div className="bg-white rounded-2xl p-4 shadow-lg">
                  <img
                    src={`data:image/png;base64,${graph}`}
                    alt="Graph"
                    className="w-full rounded-xl"
                  />
                </div>
              </div>
            )}
          </div>

          {/* SIDEBAR */}

          <div className="space-y-8">
            {/* EXAMPLES */}

            <div className="bg-white rounded-3xl shadow-2xl p-6">
              <h2 className="text-2xl font-bold mb-4">Example Equations</h2>

              <div className="space-y-3">
                {examples.map((example, index) => (
                  <button
                    key={index}
                    onClick={() => setEquation(example)}
                    className="w-full text-left bg-gray-100 hover:bg-gray-200 transition rounded-2xl p-4"
                  >
                    {example}
                  </button>
                ))}
              </div>
            </div>

            {/* HISTORY */}

            <div className="bg-white rounded-3xl shadow-2xl p-6">
              <h2 className="text-2xl font-bold mb-4">Recent Equations</h2>

              {history.length === 0 ? (
                <p className="text-gray-500">No equations solved yet.</p>
              ) : (
                <div className="space-y-3">
                  {history.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => setEquation(item)}
                      className="w-full text-left bg-gray-100 hover:bg-gray-200 transition rounded-2xl p-4"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* FEATURES */}

            <div className="bg-black text-white rounded-3xl shadow-2xl p-6">
              <h2 className="text-2xl font-bold mb-4">Supported Features</h2>

              <ul className="space-y-3 text-gray-300">
                <li>✔ Symbolic Solutions</li>
                <li>✔ Step-by-Step Explanation</li>
                <li>✔ Graph Visualization</li>
                <li>✔ Copy Solution</li>
                <li>✔ Download Results</li>
                <li>✔ Responsive Design</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
