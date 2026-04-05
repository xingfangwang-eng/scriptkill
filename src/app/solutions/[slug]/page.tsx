import { Metadata } from 'next';
import { Terminal, Code, ChevronRight, Info, DollarSign, Server } from 'lucide-react';
import keywords from '../../../../data/keywords.json';
import seedrandom from 'seedrandom';
import { HeroA } from '../../components/HeroA';
import { HeroB } from '../../components/HeroB';
import { PainPointA } from '../../components/PainPointA';
import { PainPointB } from '../../components/PainPointB';
import { PainPointC } from '../../components/PainPointC';
import { CodeDisplay } from '../../components/CodeDisplay';

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

  // 随机挑选 3 个相关页面
  const rng = seedrandom(currentSlug);
  const shuffled = [...relatedKeywords].sort(() => rng() - 0.5);
  const selectedLinks = shuffled.slice(0, Math.min(3, relatedKeywords.length));

  // 生成随机链接文字
  const linkTemplates = [
    "Explore more {category} hacks",
    "Discover another {category} solution",
    "Check out this {category} alternative",
    "Learn more about {category} automation",
    "See how to implement {category} tools"
  ];

  // 从关键词标签中提取分类
  const getCategory = (keyword: Keyword) => {
    if (!keyword.tags) return 'automation';
    const categories = {
      api: ['api', 'http', 'axios', 'curl', 'request', 'rest', 'graphql'],
      docker: ['docker', 'compose', 'container', 'image', 'registry', 'kubernetes'],
      python: ['python', 'script', 'automation', 'logging', 'webscraping', 'selenium'],
      devops: ['devops', 'monitoring', 'logging', 'ci', 'cd', 'deployment', 'pipeline'],
      security: ['security', 'authentication', 'oauth', 'jwt', 'encryption', 'password', 'ssl']
    };
    
    for (const [category, tags] of Object.entries(categories)) {
      if (keyword.tags!.some(tag => tags.includes(tag))) {
        return category;
      }
    }
    return 'automation';
  };

  const generateLinkText = (keyword: Keyword) => {
    const template = linkTemplates[Math.floor(rng() * linkTemplates.length)];
    const category = getCategory(keyword);
    return template.replace('{category}', category);
  };

  if (selectedLinks.length === 0) return null;

  return (
    <section className="mb-12">
      <div className="border border-slate-200 p-6 rounded-md bg-white">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">
          Related Solutions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {selectedLinks.map((keyword, index) => (
            <div 
              key={keyword.slug} 
              className="transition-all duration-300 hover:shadow-md p-4 rounded-md border border-slate-100"
            >
              <a 
                href={`/solutions/${keyword.slug}`} 
                className="block text-lg font-semibold text-slate-900 hover:text-blue-500 transition-colors"
              >
                {generateLinkText(keyword)}
              </a>
              <p className="mt-2 text-sm text-slate-500">
                {keyword.title}
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
  const layoutTypes = ['terminal-first', 'problem-first', 'comparison-heavy', 'code-only'];
  const accentColors = [
    '#10B981', // Emerald
    '#3B82F6', // Blue
    '#8B5CF6', // Purple
    '#EC4899', // Pink
    '#F59E0B', // Amber
    '#EF4444'  // Red
  ];

  return {
    layoutType: layoutTypes[Math.floor(rng() * layoutTypes.length)] as 'terminal-first' | 'problem-first' | 'comparison-heavy' | 'code-only',
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

const pythonHttpExamples = {
  requests: `import requests
import logging
import time
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# API configuration
API_URL = os.getenv('API_URL', 'https://api.example.com')
API_KEY = os.getenv('API_KEY')

if not API_KEY:
    logger.error('API_KEY environment variable not set')
    exit(1)

def make_api_request(endpoint, method='GET', data=None):
    url = f"{API_URL}{endpoint}"
    headers = {
        'Authorization': f'Bearer {API_KEY}',
        'Content-Type': 'application/json'
    }
    
    retries = 3
    for attempt in range(retries):
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, headers=headers, json=data, timeout=10)
            else:
                logger.error(f'Unsupported HTTP method: {method}')
                return None
            
            response.raise_for_status()
            return response.json()
        except requests.RequestException as e:
            logger.warning(f'Attempt {attempt + 1} failed: {e}')
            if attempt < retries - 1:
                time.sleep(2 ** attempt)  # Exponential backoff
            else:
                logger.error(f'All attempts failed: {e}')
                return None

# Example usage
if __name__ == '__main__':
    logger.info('Starting API request...')
    result = make_api_request('/data', 'GET')
    if result:
        logger.info(f'Received response: {result}')
    else:
        logger.error('Failed to get response')`,
  httpx: `import httpx
import logging
import time
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# API configuration
API_URL = os.getenv('API_URL', 'https://api.example.com')
API_KEY = os.getenv('API_KEY')

if not API_KEY:
    logger.error('API_KEY environment variable not set')
    exit(1)

async def make_api_request(endpoint, method='GET', data=None):
    url = f"{API_URL}{endpoint}"
    headers = {
        'Authorization': f'Bearer {API_KEY}',
        'Content-Type': 'application/json'
    }
    
    retries = 3
    for attempt in range(retries):
        try:
            async with httpx.AsyncClient(timeout=10) as client:
                if method == 'GET':
                    response = await client.get(url, headers=headers)
                elif method == 'POST':
                    response = await client.post(url, headers=headers, json=data)
                else:
                    logger.error(f'Unsupported HTTP method: {method}')
                    return None
                
                response.raise_for_status()
                return response.json()
        except httpx.RequestError as e:
            logger.warning(f'Attempt {attempt + 1} failed: {e}')
            if attempt < retries - 1:
                time.sleep(2 ** attempt)  # Exponential backoff
            else:
                logger.error(f'All attempts failed: {e}')
                return None

# Example usage
import asyncio

async def main():
    logger.info('Starting API request...')
    result = await make_api_request('/data', 'GET')
    if result:
        logger.info(f'Received response: {result}')
    else:
        logger.error('Failed to get response')

if __name__ == '__main__':
    asyncio.run(main())`
};

const codeExamples = {
  'convert-curl-to-axios': `const axios = require('axios');

// Converted from cURL command
async function makeRequest() {
  try {
    const response = await axios({
      method: 'POST',
      url: 'https://api.example.com/data',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer your-token'
      },
      data: {
        key: 'value',
        anotherKey: 'anotherValue'
      }
    });
    
    console.log('Response:', response.data);
  } catch (error) {
    console.error('Error:', error);
  }
}

makeRequest();`,
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

# 创建特定模块的 logger
logger = logging.getLogger('myapp')

# 配置日志轮转
handler = logging.handlers.RotatingFileHandler(
    'logs/app.log',
    maxBytes=10*1024*1024,  # 10MB
    backupCount=5
)
handler.setFormatter(logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s'))
logger.addHandler(handler)

# 示例用法
logger.info('Application started')
try:
    # 业务逻辑
    result = 10 / 0
except Exception as e:
    logger.error(f'Error occurred: {e}', exc_info=True)

logger.info('Application finished')`
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
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        '@id': `https://scriptkill.ai/solutions/${keyword.slug}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://scriptkill.ai'
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Solutions',
            item: 'https://scriptkill.ai/solutions'
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: keyword.title,
            item: `https://scriptkill.ai/solutions/${keyword.slug}`
          }
        ]
      },
      {
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
      },
      {
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
    ]
  };
}

export async function generateStaticParams() {
  return keywords.map((keyword) => ({
    slug: keyword.slug,
  }));
}

export default function Page({ params }: PageProps) {
  const keyword = keywords.find((k) => k.slug === params.slug);

  if (!keyword) {
    return (
      <div className="max-w-7xl mx-auto px-6 my-12">
        <h1 className="text-5xl font-black tracking-tighter text-slate-900 mb-8">Page Not Found</h1>
        <p className="text-lg text-slate-600 mb-8">The requested page could not be found.</p>
        <a href="/" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500">
          Go Home
        </a>
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
                        href={`/solutions/${relatedKeyword.slug}`}
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

          {/* 主要内容 */}
          <main className="lg:col-span-8 lg:order-2">
            {/* 面包屑导航 */}
            <nav className="mb-8" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-4">
                <li>
                  <a href="/" className="text-slate-600 hover:text-slate-900 transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <div className="flex items-center space-x-2">
                    <ChevronRight className="h-4 w-4 text-slate-400" />
                    <a href="/solutions" className="text-slate-600 hover:text-slate-900 transition-colors">
                      Solutions
                    </a>
                  </div>
                </li>
                <li>
                  <div className="flex items-center space-x-2">
                    <ChevronRight className="h-4 w-4 text-slate-400" />
                    <span className="text-slate-900 font-medium">
                      {keyword.title}
                    </span>
                  </div>
                </li>
              </ol>
            </nav>

            {/* Hero 区 */}
            {pageDNA.heroType === 'A' ? (
              <HeroA
                title={keyword.title}
                themeAccent={pageDNA.themeAccent}
              />
            ) : (
              <HeroB 
                title={keyword.title} 
                themeAccent={pageDNA.themeAccent}
              />
            )}

            {/* AI 摘要提取块 */}
            <section id="ai-summary" className="mb-12">
              <div className="bg-white border border-slate-200 p-8 rounded-md">
                <p className="text-lg leading-relaxed text-slate-600">
                  This open-source script replaces Zapier for automation tasks using Python & Docker, saving $20/mo.
                </p>
              </div>
            </section>

            {/* 问题描述区 */}
            <section className="mb-12">
              <h2 
                className="text-2xl font-bold text-slate-900 mb-6"
              >
                The Problem
              </h2>
              {pageDNA.painPointType === 'A' ? (
                <PainPointA problemDescription={keyword.problem_description} themeAccent={pageDNA.themeAccent} />
              ) : pageDNA.painPointType === 'B' ? (
                <PainPointB problemDescription={keyword.problem_description} themeAccent={pageDNA.themeAccent} />
              ) : (
                <PainPointC problemDescription={keyword.problem_description} themeAccent={pageDNA.themeAccent} />
              )}
            </section>

            {/* 解决方案区 */}
            <section className="mb-12">
              <h2 
                className="text-2xl font-bold text-slate-900 mb-6"
              >
                The Solution
              </h2>
              <div className="bg-white border border-slate-200 p-8 rounded-md">
                <p className="text-lg leading-relaxed text-slate-600 mb-6">
                  Our solution provides a complete replacement for Zapier automation using open-source tools. It uses GitHub API v3 and Docker Compose v3.8 to create a self-hosted automation platform that can handle all your workflow needs without any monthly fees.
                </p>
                <p className="text-lg leading-relaxed text-slate-600 mb-6">
                  {keyword.how_to_solve}
                </p>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 p-6 bg-slate-100 rounded-md">
                    <h3 className="text-lg font-bold text-slate-900 mb-3">Key Benefits</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start space-x-2">
                        <ChevronRight className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-600">Production-ready code</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <ChevronRight className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-600">Docker-ready configuration</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <ChevronRight className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-600">Zero monthly fees</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <ChevronRight className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-600">Full control over your infrastructure</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <ChevronRight className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-600">Reduce errors and improve code quality</span>
                      </li>
                    </ul>
                  </div>
                  <div className="flex-1 p-6 bg-slate-100 rounded-md">
                    <h3 className="text-lg font-bold text-slate-900 mb-3">Use Cases</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start space-x-2">
                        <ChevronRight className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-600">Automating repetitive tasks</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <ChevronRight className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-600">Building self-hosted alternatives to SaaS</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <ChevronRight className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-600">Creating custom automation workflows</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <ChevronRight className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-600">Improving development efficiency</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <ChevronRight className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-600">Reducing operational costs</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
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
          </main>
        </div>
      </div>

      {/* 页脚 */}
      <footer className="bg-white border-t border-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center text-slate-600">
          <p>ScriptKill - Kill the SaaS premium, host it yourself.</p>
        </div>
      </footer>
    </div>
  );
}
