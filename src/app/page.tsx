"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Terminal, Play, Loader2, Copy, Check, Download, ArrowRight } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import Typewriter from "./components/Typewriter";
import LogDecorator from "./components/LogDecorator";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [generatedCode, setGeneratedCode] = useState<{
    python_code: string;
    dockerfile: string;
    docker_compose: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("main.py");
  const [copied, setCopied] = useState(false);
  const [envVariables, setEnvVariables] = useState<Record<string, string>>({});
  const [detectedEnvVars, setDetectedEnvVars] = useState<string[]>([]);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsLoading(true);
    setGeneratedCode(null);
    setError(null);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (response.ok) {
        const data = await response.json();
        setGeneratedCode(data);
      } else {
        throw new Error('Failed to generate code');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('SEGMENTATION FAULT: API ERROR');
    } finally {
      setIsLoading(false);
    }
  };

  // 检测环境变量
  useEffect(() => {
    if (generatedCode) {
      const envVarRegex = /os\.getenv\(['"]([^'"]+)['"]/g;
      const vars = new Set<string>();
      let match;
      
      while ((match = envVarRegex.exec(generatedCode.python_code)) !== null) {
        vars.add(match[1]);
      }
      
      setDetectedEnvVars(Array.from(vars));
      setEnvVariables(Object.fromEntries(Array.from(vars).map(v => [v, ''])));
    }
  }, [generatedCode]);

  // 处理环境变量输入变化
  const handleEnvVarChange = (key: string, value: string) => {
    setEnvVariables(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // 生成 .env 文件内容
  const generateEnvFile = () => {
    return Object.entries(envVariables)
      .map(([key, value]) => `${key}=${value}`)
      .join('\n');
  };

  // 下载 .env 文件
  const downloadEnvFile = () => {
    const envContent = generateEnvFile();
    const blob = new Blob([envContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = '.env';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // 复制 Quick Start 命令
  const copyQuickStartCommand = () => {
    if (!generatedCode) return;

    const pythonCode = generatedCode.python_code.replace(/"/g, '\\"').replace(/\n/g, '\\n');
    const dockerfile = generatedCode.dockerfile.replace(/"/g, '\\"').replace(/\n/g, '\\n');
    const dockerCompose = generatedCode.docker_compose.replace(/"/g, '\\"').replace(/\n/g, '\\n');

    const command = `mkdir automation && cd automation && echo "${pythonCode}" > main.py && echo "${dockerfile}" > Dockerfile && echo "${dockerCompose}" > docker-compose.yml && docker-compose up -d`;

    navigator.clipboard.writeText(command).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center">
      {/* 顶部 Logo 和标语 */}
      <header className="w-full max-w-[1200px] px-4 py-8 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Terminal className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">
            <Typewriter text="ScriptKill" speed={100} />
          </h1>
        </div>
        <p className="text-muted-foreground">
          <Typewriter text="Kill the SaaS premium, host it yourself." speed={50} />
        </p>
      </header>

      {/* 中间 Terminal 输入框 */}
      <main className="flex-1 w-full max-w-[1200px] px-4 flex flex-col items-center justify-center">
        <div className="w-full max-w-[60%]">
          <div className="bg-slate-900 rounded-lg p-6 border border-slate-700 shadow-lg">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-400">$</span>
              <input 
                type="text" 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter your command..."
                className="bg-transparent border-none outline-none text-white flex-1 w-full font-mono focus:ring-2 focus:ring-green-400 focus:ring-opacity-50 transition-all duration-200"
              />
              <button
                onClick={handleGenerate}
                disabled={isLoading}
                className="flex items-center space-x-1 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg transition-colors"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4" />
                    <span>Execute</span>
                  </>
                )}
              </button>
            </div>
            {error && (
              <div className="mt-4 text-red-500 font-mono text-sm">{error}</div>
            )}
          </div>
        </div>

        {/* Browse All Alternatives Button */}
        <div className="mt-8 text-center">
          <Link href="/solutions" className="inline-flex items-center space-x-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg transition-colors">
            <span>Browse All Alternatives</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </main>

      {/* 底部代码展示区域 */}
      <footer className="w-full max-w-[1200px] px-4 py-8">
        {generatedCode && (
          <div className="bg-secondary rounded-lg p-6 border border-border shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">
                <Typewriter text="Generated Code" speed={50} />
              </h2>
              <button
                onClick={copyQuickStartCommand}
                className="flex items-center space-x-1 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    <span>Quick Start</span>
                  </>
                )}
              </button>
            </div>
            
            {/* Tab 切换 */}
            <div className="flex border-b border-border mb-4">
              <button
                onClick={() => setActiveTab("main.py")}
                className={`px-4 py-2 font-medium transition-colors ${activeTab === "main.py" ? "text-primary border-b-2 border-primary" : "text-muted-foreground hover:text-foreground"}`}
              >
                main.py
              </button>
              <button
                onClick={() => setActiveTab("Dockerfile")}
                className={`px-4 py-2 font-medium transition-colors ${activeTab === "Dockerfile" ? "text-primary border-b-2 border-primary" : "text-muted-foreground hover:text-foreground"}`}
              >
                Dockerfile
              </button>
              <button
                onClick={() => setActiveTab("docker-compose.yml")}
                className={`px-4 py-2 font-medium transition-colors ${activeTab === "docker-compose.yml" ? "text-primary border-b-2 border-primary" : "text-muted-foreground hover:text-foreground"}`}
              >
                docker-compose.yml
              </button>
            </div>
            
            {/* 代码展示 */}
            <div className="mb-6">
              {activeTab === "main.py" && (
                <SyntaxHighlighter language="python" style={dracula} className="rounded-lg">
                  {generatedCode.python_code}
                </SyntaxHighlighter>
              )}
              {activeTab === "Dockerfile" && (
                <SyntaxHighlighter language="dockerfile" style={dracula} className="rounded-lg">
                  {generatedCode.dockerfile}
                </SyntaxHighlighter>
              )}
              {activeTab === "docker-compose.yml" && (
                <SyntaxHighlighter language="yaml" style={dracula} className="rounded-lg">
                  {generatedCode.docker_compose}
                </SyntaxHighlighter>
              )}
            </div>
            
            {/* 环境变量处理 */}
            {detectedEnvVars.length > 0 && (
              <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm font-medium text-muted-foreground">Environment Variables</h3>
                  <button
                    onClick={downloadEnvFile}
                    className="flex items-center space-x-1 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg transition-colors text-sm"
                  >
                    <Download className="h-4 w-4" />
                    <span>Download .env</span>
                  </button>
                </div>
                <div className="bg-slate-900 rounded-lg p-4">
                  {detectedEnvVars.map((varName) => (
                    <div key={varName} className="flex items-center space-x-2 mb-2">
                      <span className="text-green-400 font-mono text-sm w-32">{varName}:</span>
                      <input
                        type="text"
                        value={envVariables[varName] || ''}
                        onChange={(e) => handleEnvVarChange(varName, e.target.value)}
                        placeholder={`Enter ${varName}`}
                        className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-green-400"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </footer>

      {/* Quick Access Section */}
      <section className="w-full max-w-[1200px] px-4 py-12 border-t border-slate-200">
        <div className="mb-6">
          <h3 className="text-sm font-medium text-slate-500 mb-4">Quick Access</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/solutions" className="text-xs text-slate-500 hover:text-blue-600 transition-colors">Automation</Link>
            <Link href="/solutions" className="text-xs text-slate-500 hover:text-blue-600 transition-colors">Docker</Link>
            <Link href="/solutions" className="text-xs text-slate-500 hover:text-blue-600 transition-colors">Python</Link>
            <Link href="/solutions" className="text-xs text-slate-500 hover:text-blue-600 transition-colors">Self-hosting</Link>
            <Link href="/solutions" className="text-xs text-slate-500 hover:text-blue-600 transition-colors">SaaS Alternatives</Link>
            <Link href="/solutions" className="text-xs text-slate-500 hover:text-blue-600 transition-colors">Open Source</Link>
            <Link href="/solutions" className="text-xs text-slate-500 hover:text-blue-600 transition-colors">Deployment</Link>
            <Link href="/solutions" className="text-xs text-slate-500 hover:text-blue-600 transition-colors">Containers</Link>
            <Link href="/solutions" className="text-xs text-slate-500 hover:text-blue-600 transition-colors">Scripting</Link>
            <Link href="/solutions" className="text-xs text-slate-500 hover:text-blue-600 transition-colors">Cloud</Link>
            <Link href="/solutions" className="text-xs text-slate-500 hover:text-blue-600 transition-colors">DevOps</Link>
            <Link href="/solutions" className="text-xs text-slate-500 hover:text-blue-600 transition-colors">Infrastructure</Link>
            <Link href="/solutions" className="text-xs text-slate-500 hover:text-blue-600 transition-colors">Code Generation</Link>
            <Link href="/solutions" className="text-xs text-slate-500 hover:text-blue-600 transition-colors">Serverless</Link>
            <Link href="/solutions" className="text-xs text-slate-500 hover:text-blue-600 transition-colors">API</Link>
          </div>
        </div>
      </section>

      {/* 日志装饰 */}
      <LogDecorator />
    </div>
  )
}
