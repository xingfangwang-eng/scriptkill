import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'ScriptKill Solutions - Self-Hosted Alternatives to SaaS Tools',
    description: 'Discover 100+ self-hosted solutions to replace expensive SaaS tools. Generate production-ready scripts and Docker configurations for free.',
    keywords: 'self-hosted, saas alternatives, docker, python, automation, api',
  };
}