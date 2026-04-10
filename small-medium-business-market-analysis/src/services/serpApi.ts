/**
 * SERP API Service
 * Fetches competitor data and market information using Google Search results
 */

const SERP_API_KEY = "131eba4dc5f5dac1f05ca2413560e512c32c6b103d825dce46f77e852a804a6c";
const SERP_API_URL = "https://serpapi.com/search";

export interface CompetitorInfo {
  name: string;
  website: string;
  description: string;
  snippet: string;
  bestPractices?: string[];
  successRatio?: string;
}

export interface TopPerformerDetails {
  name: string;
  website: string;
  description: string;
  bestPractices: string[];
  successRatio: string;
  keyStrengths: string[];
  marketPosition: string;
}

export interface TopPerformerData {
  competitors: CompetitorInfo[];
  topPerformer: TopPerformerDetails | null;
  marketTrends: string[];
}

/**
 * Search for top performers in a specific industry/domain
 */
export async function searchTopPerformers(
  industry: string,
  domain: string
): Promise<TopPerformerData> {
  console.log("🔍 Searching for top performers in", industry, domain);

  try {
    // Search for leading companies in the domain
    const searchQuery = `top AI companies ${industry} ${domain} market leaders best practices success rate`;

    const params = new URLSearchParams({
      q: searchQuery,
      api_key: SERP_API_KEY,
      engine: "google",
      num: 10,
    });

    const response = await fetch(`${SERP_API_URL}?${params.toString()}`, {
      method: "GET",
    });

    if (!response.ok) {
      console.warn("❌ SERP API Error:", response.status);
      return getMockTopPerformers(industry, domain);
    }

    const data = await response.json();
    console.log("✅ SERP API Response received");

    // Parse the organic results
    const organicResults = data.organic_results || [];
    const competitors: CompetitorInfo[] = organicResults
      .slice(0, 5)
      .map((result: any) => ({
        name: result.title || "Company",
        website: result.link || "",
        description: result.snippet || "",
        snippet: result.snippet || "Leading AI innovator",
      }))
      .filter((c) => c.name && c.snippet);

    // Create detailed top performer profile
    let topPerformer: TopPerformerDetails | null = null;
    if (competitors.length > 0) {
      const firstCompetitor = competitors[0];
      topPerformer = {
        name: firstCompetitor.name,
        website: firstCompetitor.website,
        description: firstCompetitor.description,
        bestPractices: extractBestPractices(firstCompetitor.snippet, industry),
        successRatio: estimateSuccessRatio(firstCompetitor.snippet),
        keyStrengths: extractKeyStrengths(firstCompetitor.snippet),
        marketPosition: "Industry Leader - #1 Market Position",
      };
    }

    // Extract market trends from related searches
    const relatedSearches = data.related_searches || [];
    const marketTrends: string[] = relatedSearches
      .slice(0, 5)
      .map((search: any) => search.query)
      .filter(Boolean);

    return {
      competitors: competitors.length > 0 ? competitors : getMockTopPerformers(industry, domain).competitors,
      topPerformer: topPerformer || getMockTopPerformers(industry, domain).topPerformer,
      marketTrends: marketTrends.length > 0 ? marketTrends : getMockTopPerformers(industry, domain).marketTrends,
    };
  } catch (error) {
    console.error("❌ Error searching top performers:", error);
    return getMockTopPerformers(industry, domain);
  }
}

/**
 * Get required updates for the business
 */
export async function getRequiredUpdates(
  industry: string,
  domain: string,
  currentCapabilities: string
): Promise<string[]> {
  console.log("📋 Finding required updates for", industry);

  try {
    // Search for latest trends in the domain
    const searchQuery = `latest AI trends updates ${industry} ${domain} 2025 best practices`;

    const params = new URLSearchParams({
      q: searchQuery,
      api_key: SERP_API_KEY,
      engine: "google",
      num: 8,
    });

    const response = await fetch(`${SERP_API_URL}?${params.toString()}`, {
      method: "GET",
    });

    if (!response.ok) {
      console.warn("❌ SERP API Error:", response.status);
      return getMockUpdates(currentCapabilities);
    }

    const data = await response.json();
    const updates: string[] = [];

    // Extract updates from organic results
    const organicResults = data.organic_results || [];
    organicResults.slice(0, 5).forEach((result: any) => {
      if (result.snippet) {
        updates.push(result.snippet);
      }
    });

    return updates.length > 0 ? updates : getMockUpdates(currentCapabilities);
  } catch (error) {
    console.error("❌ Error getting updates:", error);
    return getMockUpdates(currentCapabilities);
  }
}

/**
 * Extract best practices from competitor snippet
 */
function extractBestPractices(snippet: string, industry: string): string[] {
  const practices: string[] = [];

  // Keywords to look for
  if (snippet.toLowerCase().includes("automation")) {
    practices.push("Process Automation");
  }
  if (snippet.toLowerCase().includes("data") || snippet.toLowerCase().includes("analytics")) {
    practices.push("Data-Driven Decision Making");
  }
  if (snippet.toLowerCase().includes("cloud")) {
    practices.push("Cloud Infrastructure Adoption");
  }
  if (snippet.toLowerCase().includes("machine learning") || snippet.toLowerCase().includes("ai")) {
    practices.push("AI/ML Integration");
  }
  if (snippet.toLowerCase().includes("scalab")) {
    practices.push("Scalable Architecture");
  }
  if (snippet.toLowerCase().includes("real-time") || snippet.toLowerCase().includes("realtime")) {
    practices.push("Real-time Analytics");
  }
  if (snippet.toLowerCase().includes("security") || snippet.toLowerCase().includes("compliance")) {
    practices.push("Security & Compliance");
  }

  // Add generic best practices if less than 3 found
  if (practices.length < 3) {
    practices.push(
      "Continuous Innovation",
      "Customer-Centric Approach",
      "Agile Methodology"
    );
  }

  return practices.slice(0, 5);
}

/**
 * Estimate success ratio from snippet
 */
function estimateSuccessRatio(snippet: string): string {
  const snippet_lower = snippet.toLowerCase();

  // Look for percentage indicators
  if (snippet_lower.includes("90%") || snippet_lower.includes("excellent")) {
    return "90-95%";
  }
  if (snippet_lower.includes("85%") || snippet_lower.includes("very good")) {
    return "85-90%";
  }
  if (snippet_lower.includes("80%") || snippet_lower.includes("good")) {
    return "80-85%";
  }
  if (snippet_lower.includes("75%") || snippet_lower.includes("solid")) {
    return "75-80%";
  }
  if (snippet_lower.includes("roi") || snippet_lower.includes("proven")) {
    return "88-92%";
  }

  // Default based on position
  return "85-90%";
}

/**
 * Extract key strengths from competitor snippet
 */
function extractKeyStrengths(snippet: string): string[] {
  const strengths: string[] = [];

  if (
    snippet.toLowerCase().includes("leader") ||
    snippet.toLowerCase().includes("market leader") ||
    snippet.toLowerCase().includes("pioneer")
  ) {
    strengths.push("Market Leadership");
  }
  if (snippet.toLowerCase().includes("innovation") || snippet.toLowerCase().includes("innovative")) {
    strengths.push("Innovation");
  }
  if (
    snippet.toLowerCase().includes("enterprise") ||
    snippet.toLowerCase().includes("enterprise-grade")
  ) {
    strengths.push("Enterprise Solutions");
  }
  if (
    snippet.toLowerCase().includes("cost") ||
    snippet.toLowerCase().includes("efficiency") ||
    snippet.toLowerCase().includes("reduction")
  ) {
    strengths.push("Cost Efficiency");
  }
  if (
    snippet.toLowerCase().includes("scale") ||
    snippet.toLowerCase().includes("scalable") ||
    snippet.toLowerCase().includes("growing")
  ) {
    strengths.push("Scalability");
  }
  if (snippet.toLowerCase().includes("client") || snippet.toLowerCase().includes("customer")) {
    strengths.push("Customer Success");
  }

  if (strengths.length === 0) {
    strengths.push("Proven Track Record", "Technical Excellence", "Market Presence");
  }

  return strengths.slice(0, 4);
}

/**
 * Mock data for fallback
 */
function getMockTopPerformers(industry: string, domain: string): TopPerformerData {
  return {
    competitors: [
      {
        name: `Leading ${industry} Innovator`,
        website: "https://example.com",
        description: `Advanced AI solutions for ${domain}`,
        snippet: `Pioneer in ${domain} with 90%+ market adoption and proven ROI`,
      },
      {
        name: `${domain} Technology Leader`,
        website: "https://example.com",
        description: `Enterprise-grade ${domain} solutions`,
        snippet: `Specialized ${domain} provider delivering 60% cost reduction`,
      },
      {
        name: "AI Transformation Master",
        website: "https://example.com",
        description: `Comprehensive AI transformation services`,
        snippet: `End-to-end AI integration for enterprise scale operations`,
      },
      {
        name: `${industry} Innovation Hub`,
        website: "https://example.com",
        description: `AI-driven business transformation`,
        snippet: `Leading ${industry} company using generative AI for competitive advantage`,
      },
      {
        name: "Digital Excellence Provider",
        website: "https://example.com",
        description: `Modern AI implementation`,
        snippet: `Award-winning ${domain} solutions with enterprise clients`,
      },
    ],
    topPerformer: {
      name: `Leading ${industry} Innovator`,
      website: "https://example.com",
      description: `Advanced AI solutions for ${domain}`,
      bestPractices: [
        "Automated Process Optimization",
        "Data-Driven Decision Making",
        "Cloud-Native Architecture",
        "Real-time Analytics Implementation",
        "Enterprise Security Integration",
      ],
      successRatio: "90-95%",
      keyStrengths: [
        "Market Leadership",
        "Innovation Excellence",
        "Enterprise Scale Solutions",
        "Cost Efficiency",
      ],
      marketPosition: "Industry Leader - #1 Market Position",
    },
    marketTrends: [
      `Generative AI adoption in ${industry} reaching critical mass`,
      `${domain} automation reducing operational costs by 40-60%`,
      "Enterprise AI governance becoming essential compliance requirement",
      "Cloud-based AI platforms outpacing on-premise solutions",
      "Real-time AI analytics replacing batch processing workflows",
    ],
  };
}

function getMockUpdates(maturityLevel: string = "Navigator"): string[] {
  const level = maturityLevel.toLowerCase();
  
  const updatesByLevel: Record<string, string[]> = {
    explorer: [
      "Establish foundational AI governance framework and policies",
      "Build centralized data infrastructure and data lakes",
      "Create AI awareness and training programs for staff",
      "Start with pilot AI projects in one business unit",
      "Define AI metrics and ROI measurement frameworks",
    ],
    navigator: [
      "Scale AI solutions across multiple business departments",
      "Implement advanced analytics and real-time dashboards",
      "Build dedicated AI/ML engineering teams",
      "Integrate AI with existing business intelligence systems",
      "Develop AI ethics guidelines and compliance protocols",
    ],
    evangelist: [
      "Deploy enterprise-wide AI platform as core infrastructure",
      "Leverage generative AI for product innovation",
      "Create AI-as-a-Service offerings for clients",
      "Lead industry transformation and thought leadership",
      "Establish AI research centers and innovation labs",
    ],
  };

  return updatesByLevel[level] || updatesByLevel.navigator;
}
