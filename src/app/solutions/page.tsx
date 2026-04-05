'use client';

import Link from 'next/link';
import { useState, useEffect, useMemo } from 'react';
import { Search, ChevronRight, Terminal, Code, Server, Database, Globe, Shield } from 'lucide-react';
import keywords from '../../../data/keywords.json';
import Breadcrumb from '../components/Breadcrumb';

// 分类定义
interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  keywords: string[];
  color: string;
}

// 定义五大分类
const categories: Category[] = [
  {
    id: 'api',
    name: 'API & HTTP',
    icon: <Globe className="w-5 h-5" />,
    keywords: ['api', 'http', 'axios', 'curl', 'request', 'rest', 'graphql'],
    color: 'bg-blue-500'
  },
  {
    id: 'docker',
    name: 'Docker & Containers',
    icon: <Server className="w-5 h-5" />,
    keywords: ['docker', 'compose', 'container', 'image', 'registry', 'kubernetes'],
    color: 'bg-cyan-500'
  },
  {
    id: 'python',
    name: 'Python Automation',
    icon: <Code className="w-5 h-5" />,
    keywords: ['python', 'script', 'automation', 'logging', 'webscraping', 'selenium'],
    color: 'bg-green-500'
  },
  {
    id: 'devops',
    name: 'DevOps & Monitoring',
    icon: <Database className="w-5 h-5" />,
    keywords: ['devops', 'monitoring', 'logging', 'ci', 'cd', 'deployment', 'pipeline'],
    color: 'bg-purple-500'
  },
  {
    id: 'security',
    name: 'Security & Authentication',
    icon: <Shield className="w-5 h-5" />,
    keywords: ['security', 'authentication', 'oauth', 'jwt', 'encryption', 'password', 'ssl'],
    color: 'bg-red-500'
  }
];

// 关键词类型定义
interface Keyword {
  keyword?: string;
  slug: string;
  title: string;
  problem_description: string;
  how_to_solve: string;
  tags?: string[];
}

// 智能分类函数
function categorizeKeywords(keywords: Keyword[]) {
  const categorized: Record<string, typeof keywords> = {
    api: [],
    docker: [],
    python: [],
    devops: [],
    security: []
  };

  keywords.forEach(keyword => {
    let assigned = false;
    
    // 检查标签
    if (keyword.tags) {
      for (const tag of keyword.tags) {
        for (const category of categories) {
          if (category.keywords.includes(tag) && !assigned) {
            categorized[category.id].push(keyword);
            assigned = true;
            break;
          }
        }
        if (assigned) break;
      }
    }

    // 如果没有通过标签分类，检查标题
    if (!assigned) {
      const titleLower = keyword.title.toLowerCase();
      for (const category of categories) {
        if (category.keywords.some(key => titleLower.includes(key)) && !assigned) {
          categorized[category.id].push(keyword);
          assigned = true;
          break;
        }
      }
    }

    // 如果仍然没有分类，默认归类到 API 类别
    if (!assigned) {
      categorized.api.push(keyword);
    }
  });

  return categorized;
}

// 生成 JSON-LD 结构化数据
function generateJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'ScriptKill Solutions',
    description: 'A collection of self-hosted solutions to replace expensive SaaS tools',
    itemListElement: keywords.map((keyword, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: keyword.title,
      url: `https://scriptkill.ai/solutions/${keyword.slug}`
    }))
  };
}

export default function SolutionsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  // 计算分类结果
  const categorizedKeywords = useMemo(() => categorizeKeywords(keywords), [keywords]);
  
  // 计算过滤结果
  const filteredKeywords = useMemo(() => {
    let result: Keyword[] = [];
    
    if (activeCategory) {
      result = categorizedKeywords[activeCategory];
    } else {
      // 合并所有分类
      Object.values(categorizedKeywords).forEach(category => {
        result = [...result, ...category];
      });
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(keyword => 
        keyword.title.toLowerCase().includes(term) ||
        keyword.problem_description.toLowerCase().includes(term) ||
        (keyword.tags && keyword.tags.some(tag => tag.toLowerCase().includes(term)))
      );
    }

    return result;
  }, [searchTerm, activeCategory, categorizedKeywords]);

  const jsonLd = generateJsonLd();

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* JSON-LD 结构化数据 */}
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 导航栏 */}
      <nav className="bg-white border-b border-slate-200 py-4">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Terminal className="h-6 w-6 text-slate-900" />
            <span className="text-xl font-bold text-slate-900">ScriptKill</span>
          </div>
          <Link href="/" className="text-slate-600 hover:text-slate-900 transition-colors">
            Home
          </Link>
        </div>
      </nav>

      {/* 吸顶搜索栏 */}
      <div className="sticky top-0 z-10 bg-white border-b border-slate-200 py-4">
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search solutions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
        </div>
      </div>

      {/* 主内容 */}
      <div className="max-w-7xl mx-auto px-6 my-12">
        {/* 面包屑导航 */}
        <Breadcrumb 
          items={[
            { label: 'Home', href: '/' },
            { label: 'Solutions', href: '/solutions', active: true }
          ]}
        />
        
        {/* 标题 */}
        <div className="mb-12">
          <h1 className="text-5xl font-black tracking-tighter text-slate-900 mb-4">
            Self-Hosted Solutions
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl">
            Discover 100+ self-hosted alternatives to expensive SaaS tools. Generate production-ready scripts and Docker configurations for free.
          </p>
        </div>

        {/* 分类导航 */}
        <nav className="mb-12">
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setActiveCategory(null)}
              className={`px-6 py-3 rounded-md transition-colors ${activeCategory === null ? 'bg-slate-900 text-white' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'}`}
            >
              All Solutions
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-md transition-colors flex items-center space-x-2 ${activeCategory === category.id ? 'bg-slate-900 text-white' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'}`}
              >
                {category.icon}
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </nav>

        {/* 搜索结果统计 */}
        <div className="mb-8">
          <p className="text-slate-600">
            {filteredKeywords.length} solutions found
          </p>
        </div>

        {/* 解决方案网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredKeywords.map((keyword) => (
            <article key={keyword.slug} className="bg-white border border-slate-200 p-8 rounded-md hover:border-blue-500 transition-colors">
              <Link href={`/solutions/${keyword.slug}`} className="block">
                <h3 className="text-xl font-bold text-slate-900 mb-3 hover:text-blue-500 transition-colors">
                  {keyword.title}
                </h3>
                <p className="text-slate-600 mb-4 line-clamp-3">
                  {keyword.problem_description}
                </p>
                <div className="flex items-center text-blue-500 font-medium">
                  <span>View Solution</span>
                  <ChevronRight className="ml-1 h-4 w-4" />
                </div>
              </Link>
            </article>
          ))}
        </div>

        {/* 分类展示 */}
        {!activeCategory && Object.entries(categorizedKeywords).map(([categoryId, items]) => {
          if (items.length === 0) return null;
          
          const category = categories.find(c => c.id === categoryId);
          if (!category) return null;

          // 为每个分类生成行业痛点深度解析
          const getCategoryAnalysis = (catId: string) => {
            switch (catId) {
              case 'api':
                return `API integration is a critical component of modern software development, but it often comes with high costs and complex implementation. Many businesses struggle with managing API requests, handling authentication, and ensuring reliability. Our solutions address these pain points with tools like <Link href="/solutions/convert-curl-to-axios" className="text-blue-500 hover:underline">Curl to Axios conversion</Link>, <Link href="/solutions/rest-api-best-practices" className="text-blue-500 hover:underline">REST API best practices</Link>, and <Link href="/solutions/graphql-queries-optimization" className="text-blue-500 hover:underline">GraphQL query optimization</Link>. These tools help developers streamline their API workflows and reduce operational costs.`;
              case 'docker':
                return `Containerization has revolutionized how applications are deployed, but many teams face challenges with Docker configuration, orchestration, and scaling. Our <Link href="/solutions/docker-compose-best-practices" className="text-blue-500 hover:underline">Docker Compose best practices</Link> and <Link href="/solutions/kubernetes-deployment" className="text-blue-500 hover:underline">Kubernetes deployment</Link> solutions help teams overcome these hurdles. By automating container management and ensuring consistent environments, these tools eliminate the "it works on my machine" problem and reduce deployment failures.`;
              case 'python':
                return `Python automation is a powerful tool for streamlining workflows, but many organizations struggle with writing efficient scripts, handling errors, and maintaining code quality. Our solutions like <Link href="/solutions/python-logging-setup" className="text-blue-500 hover:underline">Python logging setup</Link>, <Link href="/solutions/web-scraping-best-practices" className="text-blue-500 hover:underline">web scraping best practices</Link>, and <Link href="/solutions/selenium-automation" className="text-blue-500 hover:underline">Selenium automation</Link> help developers create reliable, maintainable scripts that save time and reduce manual errors.`;
              case 'devops':
                return `DevOps practices are essential for modern software development, but many teams struggle with CI/CD pipeline setup, monitoring, and deployment automation. Our solutions like <Link href="/solutions/ci-cd-pipeline-setup" className="text-blue-500 hover:underline">CI/CD pipeline setup</Link>, <Link href="/solutions/monitoring-dashboard" className="text-blue-500 hover:underline">monitoring dashboard</Link>, and <Link href="/solutions/automated-deployment" className="text-blue-500 hover:underline">automated deployment</Link> help teams implement DevOps best practices and reduce time to market.`;
              case 'security':
                return `Security is a top concern for organizations of all sizes, but many struggle with authentication, encryption, and compliance. Our solutions like <Link href="/solutions/jwt-authentication" className="text-blue-500 hover:underline">JWT authentication</Link>, <Link href="/solutions/password-encryption" className="text-blue-500 hover:underline">password encryption</Link>, and <Link href="/solutions/ssl-certificate-management" className="text-blue-500 hover:underline">SSL certificate management</Link> help organizations secure their applications and protect user data, reducing the risk of breaches and compliance issues.`;
              default:
                return '';
            }
          };

          return (
            <section key={categoryId} className="mb-16">
              <div className="flex items-center mb-6">
                <div className={`w-1 h-8 ${category.color} mr-4`}></div>
                <h2 className="text-2xl font-bold text-slate-900">
                  {category.name}
                </h2>
              </div>
              
              {/* 行业痛点深度解析 */}
              <div className="bg-white border border-slate-200 p-8 rounded-md mb-8">
                <p className="text-lg text-slate-600 mb-4">
                  {getCategoryAnalysis(categoryId)}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((keyword) => (
                  <article key={keyword.slug} className="bg-white border border-slate-200 p-8 rounded-md hover:border-blue-500 transition-colors">
                    <Link href={`/solutions/${keyword.slug}`} className="block">
                      <h3 className="text-xl font-bold text-slate-900 mb-3 hover:text-blue-500 transition-colors">
                        {keyword.title}
                      </h3>
                      <p className="text-slate-600 mb-4 line-clamp-3">
                        {keyword.problem_description}
                      </p>
                      <div className="flex items-center text-blue-500 font-medium">
                        <span>View Solution</span>
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </section>
          );
        })};
      </div>


    </div>
  );
}
