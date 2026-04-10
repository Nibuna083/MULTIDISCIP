const fs = require('fs');
const path = require('path');

/**
 * Loads business knowledge from local file
 */
class KnowledgeLoader {
  constructor() {
    this.knowledgePath = path.join(__dirname, '../../knowledge.txt');
    this.knowledge = null;
    this.lastLoaded = null;
  }

  /**
   * Load knowledge from file
   * Caches the result to avoid repeated file reads
   * @returns {string} - The business knowledge content
   */
  load() {
    try {
      // Check if file exists
      if (!fs.existsSync(this.knowledgePath)) {
        console.warn(`Knowledge file not found at ${this.knowledgePath}`);
        return 'No specific business knowledge available.';
      }

      // Read from cache if available and file hasn't changed
      const stats = fs.statSync(this.knowledgePath);
      const lastModified = stats.mtime.getTime();

      if (this.knowledge && this.lastLoaded === lastModified) {
        return this.knowledge;
      }

      // Read the knowledge file
      const content = fs.readFileSync(this.knowledgePath, 'utf-8');
      
      if (!content || content.trim().length === 0) {
        console.warn('Knowledge file is empty');
        return 'No specific business knowledge available.';
      }

      // Cache the knowledge
      this.knowledge = content.trim();
      this.lastLoaded = lastModified;

      console.log(`✅ Knowledge loaded from ${this.knowledgePath} (${content.length} characters)`);
      return this.knowledge;

    } catch (error) {
      console.error('Error loading knowledge file:', error);
      return 'No specific business knowledge available.';
    }
  }

  /**
   * Force reload knowledge from file (clears cache)
   */
  reload() {
    this.knowledge = null;
    this.lastLoaded = null;
    return this.load();
  }
}

module.exports = new KnowledgeLoader();
