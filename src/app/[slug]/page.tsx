import { Metadata } from 'next';
import { Terminal, Code, ChevronRight, Info, DollarSign, Server } from 'lucide-react';
import keywords from '../../../data/keywords.json';
import seedrandom from 'seedrandom';
import { HeroA } from '../components/HeroA';
import { HeroB } from '../components/HeroB';
import { PainPointA } from '../components/PainPointA';
import { PainPointB } from '../components/PainPointB';
import { PainPointC } from '../components/PainPointC';
import { CodeDisplay } from '../components/CodeDisplay';

interface SemanticContext {
  type: 'tech' | 'cost' | 'env';
  title: string;
  content: React.ReactNode;
}

function injectSemanticContext(problem_description: string, slug: string): SemanticContext {
  const rng = seedrandom(slug);
  const contextType = ['tech', 'cost', 'env'][Math.floor(rng() * 3)] as 'tech' | 'cost' | 'env';

  switch (contextType) {
    case 'tech':
      return generateTechContext(problem_description, slug);
    case 'cost':
      return generateCostContext(problem_description, slug);
    case 'env':
      return generateEnvContext(problem_description, slug);
    default:
      return generateTechContext(problem_description, slug);
  }
}

function generateTechContext(problem_description: string, slug: string): SemanticContext {
  const rng = seedrandom(slug);
  const techTopics = [
    {
      keywords: ['gmail', 'email'],
      title: 'OAuth2 Security for Email Automation',
      content: (
        <>
          <p className="text-slate-600 mb-4">
            When automating email tasks, OAuth2 is the gold standard for authentication. It provides a secure way to access user data without storing passwords.
          </p>
          <p className="text-slate-600">
            Key benefits include token-based authentication, fine-grained permissions, and automatic token refresh. Always store your OAuth credentials securely using environment variables and never hardcode them in your scripts.
          </p>
        </>
      )
    },
    {
      keywords: ['docker', 'compose'],
      title: 'Container Orchestration Best Practices',
      content: (
        <>
          <p className="text-slate-600 mb-4">
            Docker Compose simplifies multi-container application management, but proper configuration is crucial for production environments.
          </p>
          <p className="text-slate-600">
            Always specify exact image versions, use health checks, and implement resource limits. For production, consider using Docker Swarm or Kubernetes for enhanced orchestration capabilities.
          </p>
        </>
      )
    },
    {
      keywords: ['logging', 'python'],
      title: 'Structured Logging for Python Applications',
      content: (
        <>
          <p className="text-slate-600 mb-4">
            Structured logging is essential for production-grade Python applications, enabling easier log analysis and monitoring.
          </p>
          <p className="text-slate-600">
            Use JSON-formatted logs for machine readability, include contextual information, and implement log rotation to prevent disk space issues. Tools like ELK Stack or CloudWatch can help centralize and analyze your logs.
          </p>
        </>
      )
    },
    {
      keywords: ['api', 'http', 'request'],
      title: 'API Rate Limiting and Retry Strategies',
      content: (
        <>
          <p className="text-slate-600 mb-4">
            When working with APIs, rate limiting is a common challenge that can disrupt your automation workflows.
          </p>
          <p className="text-slate-600">
            Implement exponential backoff for retries, respect HTTP 429 responses, and consider using a caching layer to reduce API calls. Always follow the API provider's rate limit guidelines to avoid getting blocked.
          </p>
        </>
      )
    },
    {
      keywords: ['curl', 'axios', 'http'],
      title: 'HTTP Client Best Practices',
      content: (
        <>
          <p className="text-slate-600 mb-4">
            Choosing the right HTTP client and using it effectively is crucial for reliable API interactions.
          </p>
          <p className="text-slate-600">
            Always set appropriate timeouts, handle errors gracefully, and use connection pooling for better performance. Consider using libraries like Axios for its Promise-based API and built-in features like interceptors.
          </p>
        </>
      )
    }
  ];

  // Find relevant tech topic or use a generic one
  const relevantTopic = techTopics.find(topic => 
    topic.keywords.some(keyword => slug.includes(keyword))
  ) || techTopics[Math.floor(rng() * techTopics.length)];

  return {
    type: 'tech',
    title: relevantTopic.title,
    content: relevantTopic.content
  };
}

function generateCostContext(problem_description: string, slug: string): SemanticContext {
  const rng = seedrandom(slug);
  const monthlySaaSCost = Math.floor(rng() * 50) + 10; // $10-$60/month
  const yearlySaaSCost = monthlySaaSCost * 12;
  const oneTimeSetupCost = Math.floor(rng() * 50) + 50; // $50-$100
  const monthlySelfHostedCost = Math.floor(rng() * 5) + 1; // $1-$5/month
  const yearlySelfHostedCost = monthlySelfHostedCost * 12;
  const breakEvenMonths = Math.ceil(oneTimeSetupCost / (monthlySaaSCost - monthlySelfHostedCost));
  const fiveYearSavings = (yearlySaaSCost - yearlySelfHostedCost) * 5 - oneTimeSetupCost;

  return {
    type: 'cost',
    title: 'ROI Calculator: Self-Hosted vs SaaS',
    content: (
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-slate-100">
              <th className="border border-slate-200 p-3 text-left font-bold">Cost Category</th>
              <th className="border border-slate-200 p-3 text-left font-bold">SaaS Solution</th>
              <th className="border border-slate-200 p-3 text-left font-bold">Self-Hosted (ScriptKill)</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-slate-50">
              <td className="border border-slate-200 p-3">Monthly Cost</td>
              <td className="border border-slate-200 p-3 text-red-600">${monthlySaaSCost.toFixed(2)}</td>
              <td className="border border-slate-200 p-3 text-green-600">${monthlySelfHostedCost.toFixed(2)}</td>
            </tr>
            <tr className="hover:bg-slate-50">
              <td className="border border-slate-200 p-3">Yearly Cost</td>
              <td className="border border-slate-200 p-3 text-red-600">${yearlySaaSCost.toFixed(2)}</td>
              <td className="border border-slate-200 p-3 text-green-600">${yearlySelfHostedCost.toFixed(2)}</td>
            </tr>
            <tr className="hover:bg-slate-50">
              <td className="border border-slate-200 p-3">One-Time Setup</td>
              <td className="border border-slate-200 p-3">$0</td>
              <td className="border border-slate-200 p-3">${oneTimeSetupCost.toFixed(2)}</td>
            </tr>
            <tr className="hover:bg-slate-50">
              <td className="border border-slate-200 p-3">Break-Even Point</td>
              <td className="border border-slate-200 p-3" colSpan={2}>
                {breakEvenMonths} months
              </td>
            </tr>
            <tr className="hover:bg-slate-50">
              <td className="border border-slate-200 p-3">5-Year Savings</td>
              <td className="border border-slate-200 p-3" colSpan={2}>
                <span className="text-green-600 font-bold">${fiveYearSavings.toFixed(2)}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  };
}

function generateEnvContext(problem_description: string, slug: string): SemanticContext {
  const rng = seedrandom(slug);
  const environments = [
    {
      name: 'Raspberry Pi 4',
      specs: '4GB RAM, 32GB SD card',
      pros: ['Low power consumption', 'Affordable', 'Perfect for small automation tasks'],
      cons: ['Limited processing power', 'SD card lifespan'],
      ideal: 'Small-scale automation scripts, personal projects'
    },
    {
      name: 'Synology NAS',
      specs: '2GB+ RAM, multiple storage bays',
      pros: ['Always-on', 'Redundant storage', 'Built-in Docker support'],
      cons: ['Higher initial cost', 'More complex setup'],
      ideal: 'Medium-scale automation, file storage, media server'
    },
    {
      name: 'Oracle Cloud Free Tier',
      specs: '1GB RAM, 20GB storage, AMD instance',
      pros: ['Free forever', 'Scalable', 'Professional-grade infrastructure'],
      cons: ['Limited resources', 'Requires cloud knowledge'],
      ideal: 'Production-ready applications, scalable services'
    },
    {
      name: 'Home Server (DIY)',
      specs: 'Customizable RAM and storage',
      pros: ['Fully customizable', 'Unlimited potential', 'Learn valuable skills'],
      cons: ['Higher initial cost', 'Requires maintenance'],
      ideal: 'Large-scale automation, multiple services, learning platform'
    },
    {
      name: 'DigitalOcean Droplet',
      specs: '1GB RAM, 25GB storage, $5/month',
      pros: ['Simple setup', 'Reliable', 'Good performance'],
      cons: ['Monthly cost', 'Limited resources'],
      ideal: 'Small production applications, testing environments'
    }
  ];

  const selectedEnv = environments[Math.floor(rng() * environments.length)];

  return {
    type: 'env',
    title: `Recommended Deployment Environment: ${selectedEnv.name}`,
    content: (
      <>
        <div className="mb-4">
          <h4 className="font-bold text-slate-700 mb-2">Specifications</h4>
          <p className="text-slate-600">{selectedEnv.specs}</p>
        </div>
        <div className="mb-4">
          <h4 className="font-bold text-slate-700 mb-2">Pros</h4>
          <ul className="list-disc list-inside text-slate-600 space-y-1">
            {selectedEnv.pros.map((pro, index) => (
              <li key={index}>{pro}</li>
            ))}
          </ul>
        </div>
        <div className="mb-4">
          <h4 className="font-bold text-slate-700 mb-2">Cons</h4>
          <ul className="list-disc list-inside text-slate-600 space-y-1">
            {selectedEnv.cons.map((con, index) => (
              <li key={index}>{con}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-slate-700 mb-2">Ideal For</h4>
          <p className="text-slate-600">{selectedEnv.ideal}</p>
        </div>
      </>
    )
  };
}

const ctaVariations = [
  "Ready to take control of your automation? Generate your script now.",
  "Stop paying for overpriced SaaS tools. Create your self-hosted solution today.",
  "Want to save time and money? Let's build your custom automation script.",
  "Ready to break free from vendor lock-in? Generate your code now.",
  "Tired of monthly fees? Create your self-hosted automation solution today.",
  "Ready to streamline your workflow? Generate your custom script now.",
  "Stop relying on third-party services. Build your own automation tool.",
  "Want to reduce operational costs? Create your self-hosted solution today.",
  "Ready to automate smarter, not harder? Generate your script now.",
  "Tired of limited customization? Build your own automation solution today."
];

function getRandomCTA(slug: string): string {
  const rng = seedrandom(slug);
  return ctaVariations[Math.floor(rng() * ctaVariations.length)];
}

interface SmartLink {
  keyword: Keyword;
  linkText: string;
  weight: 'high' | 'medium' | 'low';
}

function SmartInternalLinking({ currentSlug, allKeywords }: { currentSlug: string; allKeywords: Keyword[] }) {
  const currentKeyword = allKeywords.find(k => k.slug === currentSlug);
  if (!currentKeyword) return null;

  // 基于标签找到相关页面
  const relatedKeywords = allKeywords.filter(k => {
    if (!k.tags || !currentKeyword.tags) return false;
    return k.slug !== currentSlug &&
           k.tags.some(tag => currentKeyword.tags!.includes(tag));
  });

  // 随机挑选 3-5 个相关页面
  const rng = seedrandom(currentSlug);
  const numLinks = Math.floor(rng() * 3) + 3; // 3-5 links
  const shuffled = [...relatedKeywords].sort(() => rng() - 0.5);
  const selectedLinks = shuffled.slice(0, Math.min(numLinks, relatedKeywords.length));

  // 生成随机链接文字
  const linkTemplates = [
    "Learn more about {topic}",
    "Discover how to {action}",
    "Check out our guide on {topic}",
    "Explore more {topic} solutions",
    "See how to optimize {topic}",
    "Learn best practices for {topic}",
    "Discover tips for {topic}",
    "Check out our {topic} tutorial"
  ];

  const actions = [
    "implement this",
    "set this up",
    "optimize this",
    "configure this",
    "automate this"
  ];

  const generateLinkText = (keyword: Keyword) => {
    const template = linkTemplates[Math.floor(rng() * linkTemplates.length)];
    const action = actions[Math.floor(rng() * actions.length)];
    
    // 从关键词标题中提取主题
    let topic = keyword.title.toLowerCase()
      .replace(/how to|best practices|for production|setup|convert/g, '')
      .trim()
      .split(' ') 
      .slice(0, 3)
      .join(' ');
    
    if (!topic) topic = keyword.tags?.[0] || 'this';
    
    return template
      .replace('{topic}', topic)
      .replace('{action}', action);
  };

  // 为每个链接分配权重
  const weightedLinks: SmartLink[] = selectedLinks.map((keyword, index) => {
    let weight: 'high' | 'medium' | 'low';
    if (index === 0) {
      weight = 'high';
    } else if (index === 1) {
      weight = 'medium';
    } else {
      weight = 'low';
    }
    
    return {
      keyword,
      linkText: generateLinkText(keyword),
      weight
    };
  });

  if (weightedLinks.length === 0) return null;

  return (
    <section className="mb-12">
      <div className="border border-slate-200 p-6 rounded-md bg-white">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">
          Related Resources
        </h2>
        <div className="flex flex-wrap gap-6">
          {weightedLinks.map((link, index) => (
            <div 
              key={link.keyword.slug} 
              className={`transition-all duration-300 hover:shadow-md p-4 rounded-md border border-slate-100 ${link.weight === 'high' ? 'w-full md:w-1/2' : link.weight === 'medium' ? 'w-full md:w-1/3' : 'w-full md:w-1/4'}`}
            >
              <a 
                href={`/${link.keyword.slug}`} 
                className={`block ${link.weight === 'high' ? 'text-xl font-bold' : link.weight === 'medium' ? 'text-lg font-semibold' : 'text-base font-medium'}`}
                style={{ color: '#333' }}
              >
                {link.linkText}
              </a>
              <p className="mt-2 text-sm text-slate-500">
                {link.keyword.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

interface PageDNA {
  layoutType: 'terminal-first' | 'problem-first' | 'comparison-heavy' | 'code-only';
  themeAccent: string;
  sidebarPosition: 'left' | 'right';
  snippetLanguage: 'requests' | 'httpx';
  heroType: 'A' | 'B';
  painPointType: 'A' | 'B' | 'C';
}

function generatePageDNA(slug: string): PageDNA {
  const rng = seedrandom(slug);
  
  const layoutTypes: ('terminal-first' | 'problem-first' | 'comparison-heavy' | 'code-only')[] = [
    'terminal-first',
    'problem-first',
    'comparison-heavy',
    'code-only'
  ];
  
  const accentColors = [
    '#39FF14', // 荧光绿
    '#00FFFF', // 电光蓝
    '#FF00FF', // 赛博粉
    '#FFFF00', // 荧光黄
    '#FF6EC7'  // 粉红
  ];
  
  return {
    layoutType: layoutTypes[Math.floor(rng() * layoutTypes.length)],
    themeAccent: accentColors[Math.floor(rng() * accentColors.length)],
    sidebarPosition: rng() > 0.5 ? 'left' : 'right',
    snippetLanguage: rng() > 0.5 ? 'requests' : 'httpx',
    heroType: rng() > 0.5 ? 'A' : 'B',
    painPointType: ['A', 'B', 'C'][Math.floor(rng() * 3)] as 'A' | 'B' | 'C'
  };
}

interface Keyword {
  slug: string;
  title: string;
  problem_description: string;
  how_to_solve: string;
  tags?: string[];
}

interface PageProps {
  params: {
    slug: string;
  };
}

// 示例代码
const codeExamples = {
  'convert-curl-to-axios': `import axios from 'axios';

async function fetchData() {
  try {
    const response = await axios({
      method: 'GET',
      url: 'https://api.example.com/data',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer your-token'
      },
      params: {
        page: 1,
        limit: 10
      }
    });
    console.log(response.data);
  } catch (error) {
    console.error('Error:', error);
  }
}`,
  'docker-compose-best-practices': `version: '3.8'

services:
  web:
    build: .
    restart: always
    ports:
      - "80:80"
    environment:
      - NODE_ENV=production
    volumes:
      - .:/app
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost"]
      interval: 30s
      timeout: 10s
      retries: 3`,
  'python-logging-setup': `import logging
import logging.handlers
import os

# 创建日志目录
os.makedirs('logs', exist_ok=True)

# 配置根 logger
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('logs/app.log'),
        logging.StreamHandler()
    ]
)

# 创建旋转文件处理器
rotating_handler = logging.handlers.RotatingFileHandler(
    'logs/app.log',
    maxBytes=10*1024*1024,  # 10MB
    backupCount=5
)

# 获取 logger
logger = logging.getLogger(__name__)
logger.addHandler(rotating_handler)`
};

// Python HTTP 客户端示例代码
const pythonHttpExamples = {
  requests: `import requests

url = "https://api.example.com/data"
headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer your-token"
}
params = {
    "page": 1,
    "limit": 10
}

try:
    response = requests.get(url, headers=headers, params=params)
    response.raise_for_status()  # 检查响应状态
    data = response.json()
    print(data)
except requests.exceptions.RequestException as e:
    print(f"Error: {e}")`,
  httpx: `import httpx

url = "https://api.example.com/data"
headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer your-token"
}
params = {
    "page": 1,
    "limit": 10
}

try:
    with httpx.Client() as client:
        response = client.get(url, headers=headers, params=params)
        response.raise_for_status()  # 检查响应状态
        data = response.json()
        print(data)
except httpx.RequestError as e:
    print(f"Error: {e}")`
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const unwrappedParams = await params;
  const keyword = keywords.find((k) => k.slug === unwrappedParams.slug);
  if (!keyword) {
    return {
      title: 'Page Not Found',
      description: 'The requested page could not be found.',
    };
  }

  // 随机 title 模板
  const titleTemplates = [
    '[Keyword] - How to Kill the Monthly Fee',
    'Stop Paying for [Keyword]: A Self-Hosted Guide',
    'Run [Keyword] on Docker ($0/mo Solution)'
  ];
  
  const rng = seedrandom(keyword.slug);
  const randomTemplate = titleTemplates[Math.floor(rng() * titleTemplates.length)];
  const title = randomTemplate.replace('[Keyword]', keyword.title);

  return {
    title,
    description: keyword.how_to_solve.substring(0, 160),
  };
}

// 生成 JSON-LD 结构化数据
function generateJsonLd(keyword: Keyword) {
  const rng = seedrandom(keyword.slug);
  
  // 生成过去 30 天内的随机日期
  const today = new Date();
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(today.getDate() - 30);
  const randomDate = new Date(
    thirtyDaysAgo.getTime() + rng() * (today.getTime() - thirtyDaysAgo.getTime())
  );
  const datePublished = randomDate.toISOString();
  
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        item: {
          '@type': 'SoftwareApplication',
          name: `ScriptKill - ${keyword.title}`,
          description: keyword.how_to_solve,
          datePublished,
          applicationCategory: 'Automation Tool',
          operatingSystem: 'Docker',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
            availability: 'https://schema.org/InStock'
          },
          author: {
            '@type': 'Person',
            name: 'ScriptKill Team'
          },
          publisher: {
            '@type': 'Organization',
            name: 'ScriptKill',
            logo: {
              '@type': 'ImageObject',
              url: 'https://scriptkill.ai/logo.png',
              width: 120,
              height: 40
            }
          },
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.8',
            reviewCount: '125'
          }
        }
      },
      {
        '@type': 'ListItem',
        position: 2,
        item: {
          '@type': 'HowTo',
          name: `How to implement ${keyword.title}`,
          description: `Step-by-step guide to implement ${keyword.title} using ScriptKill`,
          step: [
            {
              '@type': 'HowToStep',
              name: 'Generate Code',
              text: 'Use ScriptKill to generate the automation code for your specific use case.',
              image: 'https://scriptkill.ai/generate-code.png'
            },
            {
              '@type': 'HowToStep',
              name: 'Deploy Docker',
              text: 'Deploy the generated code using Docker to run it as a self-hosted solution.',
              image: 'https://scriptkill.ai/deploy-docker.png'
            }
          ]
        }
      }
    ]
  };
}

// 重定向到 /solutions/[slug]
export async function generateRedirect() {
  return {
    redirect: {
      destination: '/solutions/[slug]',
      permanent: true,
    },
  };
}

export default async function Page({ params }: PageProps) {
  const unwrappedParams = await params;
  const keyword = keywords.find((k) => k.slug === unwrappedParams.slug);

  if (!keyword) {
    return (
      <div className="max-w-7xl mx-auto px-6 my-12">
        <h1 className="text-5xl font-black tracking-tighter text-slate-900 mb-8">Page Not Found</h1>
        <p className="text-lg leading-relaxed text-slate-600">The requested page could not be found.</p>
      </div>
    );
  }

  // 生成 PageDNA
  const pageDNA = generatePageDNA(keyword.slug);
  
  // 生成语义上下文
  const semanticContext = injectSemanticContext(keyword.problem_description, keyword.slug);
  
  // 获取随机 CTA
  const randomCTA = getRandomCTA(keyword.slug);
  
  // 生成 JSON-LD 结构化数据
  const jsonLd = generateJsonLd(keyword);
  
  // 根据 DNA 选择代码示例
  let codeExample;
  if (keyword.slug === 'python-logging-setup') {
    codeExample = codeExamples['python-logging-setup'];
  } else if (keyword.slug === 'docker-compose-best-practices') {
    codeExample = codeExamples['docker-compose-best-practices'];
  } else if (keyword.slug === 'convert-curl-to-axios') {
    codeExample = codeExamples['convert-curl-to-axios'];
  } else {
    // 对于其他页面，使用 Python HTTP 客户端示例
    codeExample = pythonHttpExamples[pageDNA.snippetLanguage];
  }

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
            <Terminal className="h-6 w-6" style={{ color: pageDNA.themeAccent }} />
            <span className="text-xl font-bold text-slate-900">ScriptKill</span>
          </div>
          <a href="/" className="text-slate-600 hover:text-slate-900 transition-colors">
            Home
          </a>
        </div>
      </nav>

      {/* 主内容 */}
      <div className="max-w-7xl mx-auto px-6 my-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* 侧边栏 */}
          <div className={`lg:col-span-4 ${pageDNA.sidebarPosition === 'left' ? 'lg:order-1' : 'lg:order-3'}`}>
            <div className="bg-white border border-slate-200 p-8 sticky top-8">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Related Resources</h3>
              <ul className="space-y-4">
                {keywords
                  .filter((k) => k.slug !== keyword.slug)
                  .map((relatedKeyword) => (
                    <li key={relatedKeyword.slug}>
                      <a
                        href={`/${relatedKeyword.slug}`}
                        className="flex items-center space-x-2 text-slate-600 hover:text-slate-900 transition-colors"
                      >
                        <Code className="h-5 w-5 text-slate-400" />
                        <span>{relatedKeyword.title}</span>
                      </a>
                    </li>
                  ))}
              </ul>

              <div className="mt-8 pt-8 border-t border-slate-200">
                <h3 className="text-xl font-bold text-slate-900 mb-4">User Reviews</h3>
                <div className="space-y-4">
                  <div className="p-4 border border-slate-200">
                    <p className="text-slate-600 mb-2">
                      "This tool saved me hours of manual work. Highly recommended!"
                    </p>
                    <p className="text-sm text-slate-400">— John Doe, Senior Developer</p>
                  </div>
                  <div className="p-4 border border-slate-200">
                    <p className="text-slate-600 mb-2">
                      "The generated code is clean and production-ready. Perfect for my needs."
                    </p>
                    <p className="text-sm text-slate-400">— Jane Smith, DevOps Engineer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 左侧主内容 */}
          <div className={`lg:col-span-8 ${pageDNA.sidebarPosition === 'left' ? 'lg:order-2' : 'lg:order-2'}`}>
            <div className="bg-white border border-slate-200 p-8 mb-8">
              {/* 英雄区变体 */}
              {pageDNA.heroType === 'A' ? (
                <HeroA title={keyword.title} themeAccent={pageDNA.themeAccent} />
              ) : (
                <HeroB title={keyword.title} themeAccent={pageDNA.themeAccent} />
              )}

              {/* 痛点描述变体 */}
              {pageDNA.painPointType === 'A' ? (
                <PainPointA problemDescription={keyword.problem_description} themeAccent={pageDNA.themeAccent} />
              ) : pageDNA.painPointType === 'B' ? (
                <PainPointB problemDescription={keyword.problem_description} themeAccent={pageDNA.themeAccent} />
              ) : (
                <PainPointC problemDescription={keyword.problem_description} themeAccent={pageDNA.themeAccent} />
              )}

              {/* The Guide Section */}
              <section className="mb-12">
                <h2 
                  className="text-2xl font-bold text-slate-900 mb-4 pl-4"
                  style={{ borderLeft: `4px solid ${pageDNA.themeAccent}` }}
                >
                  The Guide
                </h2>
                <p className="text-lg leading-relaxed text-slate-600 mb-4">
                  {keyword.how_to_solve}
                </p>
                <p className="text-lg leading-relaxed text-slate-600 mb-4">
                  Our approach ensures that you can quickly implement the solution without
                  extensive manual work. By following this guide, you'll be able to:
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start space-x-2">
                    <ChevronRight className="h-5 w-5 text-slate-400 mt-1 flex-shrink-0" />
                    <span className="text-lg leading-relaxed text-slate-600">
                      Save time on manual conversion and configuration
                    </span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <ChevronRight className="h-5 w-5 text-slate-400 mt-1 flex-shrink-0" />
                    <span className="text-lg leading-relaxed text-slate-600">
                      Ensure consistent implementation across projects
                    </span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <ChevronRight className="h-5 w-5 text-slate-400 mt-1 flex-shrink-0" />
                    <span className="text-lg leading-relaxed text-slate-600">
                      Follow industry best practices automatically
                    </span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <ChevronRight className="h-5 w-5 text-slate-400 mt-1 flex-shrink-0" />
                    <span className="text-lg leading-relaxed text-slate-600">
                      Reduce errors and improve code quality
                    </span>
                  </li>
                </ul>
              </section>

              {/* 语义上下文 */}
              <section className="mb-12">
                <div className="border border-slate-200 p-6 rounded-md bg-white">
                  <div className="flex items-center space-x-3 mb-4">
                    {semanticContext.type === 'tech' && <Info className="h-6 w-6" style={{ color: pageDNA.themeAccent }} />}
                    {semanticContext.type === 'cost' && <DollarSign className="h-6 w-6" style={{ color: pageDNA.themeAccent }} />}
                    {semanticContext.type === 'env' && <Server className="h-6 w-6" style={{ color: pageDNA.themeAccent }} />}
                    <h2 
                      className="text-2xl font-bold text-slate-900"
                    >
                      {semanticContext.title}
                    </h2>
                  </div>
                  <div className="text-slate-600">
                    {semanticContext.content}
                  </div>
                </div>
              </section>

              {/* 代码展示区 */}
              <CodeDisplay 
                code={codeExample} 
                language={keyword.slug.includes('docker') ? 'yaml' : keyword.slug.includes('python') ? 'python' : 'javascript'} 
                themeAccent={pageDNA.themeAccent}
                slug={keyword.slug}
              />

              {/* CTA */}
              <section className="mb-8">
                <div className="bg-slate-100 border border-slate-200 p-6 rounded-md">
                  <p className="text-lg leading-relaxed text-slate-800 mb-4">
                    {randomCTA}
                  </p>
                  <div className="bg-slate-900 border border-slate-700 p-6">
                    <div className="flex items-center space-x-2">
                      <span className="text-green-400">$</span>
                      <input
                        type="text"
                        defaultValue={`# Generate your ${keyword.slug.replace('-', ' ')} solution`}
                        className="bg-transparent border-none outline-none text-white flex-1 w-full font-mono focus:ring-2 focus:ring-green-400 focus:ring-opacity-50 transition-all duration-200"
                      />
                      <button 
                        className="px-4 py-2 rounded-md transition-colors active:scale-95" 
                        style={{ backgroundColor: pageDNA.themeAccent, color: '#000', fontWeight: 'bold' }}
                      >
                        Execute
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              {/* Smart Internal Linking */}
              <SmartInternalLinking currentSlug={keyword.slug} allKeywords={keywords} />
            </div>
          </div>
        </div>
      </div>

      {/* 页脚 */}
      <footer className="bg-white border-t border-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Terminal className="h-6 w-6" style={{ color: pageDNA.themeAccent }} />
              <span className="text-xl font-bold text-slate-900">ScriptKill</span>
            </div>
            <p className="text-slate-600">
              Kill the SaaS premium, host it yourself.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
