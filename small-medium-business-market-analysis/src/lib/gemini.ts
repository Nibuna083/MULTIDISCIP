import { GoogleGenerativeAI } from "@google/generative-ai";
import { searchTopPerformers, getRequiredUpdates } from "../services/serpApi";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY || "");

export interface MarketAnalysisRequest {
  industry: string;
  domain: string;
  budget: string;
  currentMaturity: string;
}

export async function generateMarketAnalysis(data: MarketAnalysisRequest) {
  console.log("📊 Generating enhanced market analysis with SERP data...");
  
  if (!API_KEY) {
    console.warn("Gemini API key not found. Returning mock analysis.");
    return getMockAnalysis(data);
  }

  try {
    // Fetch real competitor data from SERP API
    console.log("🔍 Fetching top performers from SERP API...");
    const topPerformersData = await searchTopPerformers(data.industry, data.domain);
    const requiredUpdates = await getRequiredUpdates(data.industry, data.domain, data.currentMaturity);
    
    console.log("✅ SERP data fetched successfully");
    
    // Use Gemini to analyze and enhance the data
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.0-flash",
    });

    // Create a comprehensive prompt with real web data
    const competitorNames = topPerformersData.competitors
      .map((c) => c.name)
      .join(", ");

    const prompt = `
      Conduct a comprehensive competitive AI market analysis for a company using this real web data:
      - Industry: ${data.industry}
      - Domain: ${data.domain}
      - Annual AI Budget: ${data.budget}
      - Current Maturity Status: ${data.currentMaturity}
      
      TOP PERFORMERS FOUND (from web search):
      ${topPerformersData.competitors.map((c) => `- ${c.name}: ${c.snippet}`).join("\n")}
      
      MARKET TRENDS IDENTIFIED:
      ${topPerformersData.marketTrends.join("\n")}
      
      RECENT UPDATES NEEDED:
      ${requiredUpdates.join("\n")}

      Your task:
      1. Analyze the top performers listed above and explain their strategies
      2. Identify what this company is missing compared to leaders
      3. Provide 3-4 specific, actionable recommendations based on the market trends
      4. Suggest which updates are critical for their current stage

      Return ONLY valid JSON (no markdown, no code blocks) in this exact format:
      {
        "competitors": [
          { "name": "string", "roi_highlight": "string", "key_strategy": "string" }
        ],
        "market_trends": ["string"],
        "comparison_insight": "string",
        "recommendations": ["string"],
        "critical_updates": ["string"]
      }
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Extract JSON from the response
    const jsonString = text.replace(/```json/g, "").replace(/```/g, "").trim();
    const analysis = JSON.parse(jsonString);
    
    console.log("✅ Market analysis generated successfully");
    return analysis;
  } catch (error) {
    console.error("❌ Error generating market analysis:", error);
    return getMockAnalysis(data);
  }
}

function getMockAnalysis(data: MarketAnalysisRequest) {
  return {
    competitors: [
      {
        name: `${data.industry} Leader A`,
        roi_highlight: "340% ROI in 18 months",
        key_strategy: "Automated customer lifecycle management"
      },
      {
        name: "Innovator Startup X",
        roi_highlight: "50% reduction in operational costs",
        key_strategy: "Predictive maintenance using synthetic data"
      },
      {
        name: "Global Tech Corp",
        roi_highlight: "65% faster time-to-market",
        key_strategy: "AI-driven product development"
      }
    ],
    market_trends: [
      `Increasing adoption of LLMs in ${data.domain}`,
      "Shift towards decentralized AI governance",
      "Focus on ROI-driven data readiness",
      "Cloud-native AI infrastructure gaining dominance",
      "Emphasis on responsible AI and compliance"
    ],
    comparison_insight: `While your budget of ${data.budget} is competitive for the ${data.industry} mid-market, your ${data.currentMaturity} maturity suggests you're 12-18 months behind industry leaders. The top performers prioritize data infrastructure and talent development before deploying models.`,
    recommendations: [
      "Establish a dedicated data engineering team to build robust pipelines - this is the #1 blocker for successful AI",
      "Implement a proof-of-concept program with 2-3 high-impact use cases in customer support or operations",
      "Invest in AI literacy training for leadership and key stakeholders to build organizational readiness",
      "Build partnerships with AI consultancies for rapid capability development in your first 6 months"
    ],
    critical_updates: [
      "Migrate to cloud-native infrastructure (AWS/GCP/Azure) for AI workload scalability",
      "Implement modern data governance and quality frameworks",
      "Build security and compliance controls for data protection",
      "Establish clear ROI tracking mechanisms for all AI initiatives"
    ],
    topPerformer: {
      name: `Leading ${data.industry} AI Innovator`,
      website: "https://example-leader.com",
      description: `The market leader in ${domain} solutions for ${data.industry} organizations. Known for pioneering AI adoption strategies and delivering exceptional ROI.`,
      bestPractices: [
        "Automated Process Optimization across all business units",
        "Real-time Data Analytics & Decision Making",
        "Cloud-Native AI Architecture with Microservices",
        "Continuous Model Training & Optimization",
        "Enterprise Security & Compliance Integration"
      ],
      successRatio: "91%",
      keyStrengths: [
        "Market Leadership & Brand Recognition",
        "Innovation Excellence in AI/ML",
        "Enterprise-Scale Solutions",
        "Cost Efficiency & ROI Focus"
      ],
      marketPosition: "Industry Leader - #1 Market Position"
    }
  };
}
      "Build partnerships with AI consultancies for rapid capability development in your first 6 months"
    ],
    critical_updates: [
      "Migrate to cloud-native infrastructure (AWS/GCP/Azure) for AI workload scalability",
      "Implement modern data governance and quality frameworks",
      "Build security and compliance controls for data protection",
      "Establish clear ROI tracking mechanisms for all AI initiatives"
    ]
  };
}
