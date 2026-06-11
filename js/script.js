const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');
const navLinks = document.querySelectorAll('[data-nav]');
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');
const toolSlug = document.body.dataset.tool;

const tools = {
  chatgpt: {
    name: 'ChatGPT',
    category: 'Writing AI',
    initials: 'CG',
    tone: 'tone-aquamarine',
    officialUrl: 'https://chatgpt.com',
    overview: 'Useful for brainstorming ideas, understanding concepts, drafting content, and getting coding help.',

    features: ['Conversation with follow-up questions', 'Drafts, outlines, and summaries', 'Help explaining topics in plain language'],
    useCases: ['Drafting notes and study guides', 'Turning rough ideas into clearer writing', 'Getting unstuck while building a project'],
    pros: ['Quick to start', 'Works well for many kinds of questions', 'Good for learning by asking follow-ups'],
    limitations: ['You still need to verify important facts', 'Results depend heavily on the prompt', 'Not every answer is equally reliable']
  },

  copilot: {
    name: 'GitHub Copilot',
    category: 'Coding AI',
    initials: 'GC',
    tone: 'tone-sky',
    officialUrl: 'https://github.com/features/copilot',
    overview: 'An editor assistant that helps by suggesting code and explaining what you’re trying to do.',
    features: ['Inline suggestions while you type', 'Help with common patterns and boilerplate', 'Suggestions based on your surrounding code'],
    useCases: ['Writing small code blocks faster', 'Learning how common patterns are implemented', 'Refactoring with less manual work'],
    pros: ['Speeds up routine coding', 'Works directly in your workflow', 'Helpful for getting unstuck'],
    limitations: ['You should review before using', 'It can miss edge cases', 'Some suggestions will be wrong or incomplete']
  },

  perplexity: {
    name: 'Perplexity',
    category: 'Research AI',
    initials: 'P',
    tone: 'tone-peach',
    officialUrl: 'https://www.perplexity.ai',
    overview: 'Good for quick research—turning a question into a structured answer with sources you can follow.',
    features: ['Search-style Q&A experience', 'Summaries with links/sources', 'Helpful for exploring a new topic'],
    useCases: ['Getting background for assignments', 'Finding quick answers and references', 'Collecting context before you write'],
    pros: ['Useful for starting research quickly', 'Easy to scan', 'Great when you need sources'],
    limitations: ['Always double-check key details', 'May not capture every nuance', 'Best for early-stage research']
  },

  canva: {
    name: 'Canva AI',
    category: 'Design AI',
    initials: 'CA',
    tone: 'tone-pink',
    officialUrl: 'https://www.canva.com',
    overview: 'A visual design platform with AI features that make graphics, presentations, and content creation easier.',
    features: ['Presentation and graphic templates', 'AI-powered design help', 'Simple drag-and-drop workflow'],
    useCases: ['Creating posters and banners', 'Making class presentations', 'Designing social media visuals'],
    pros: ['Beginner-friendly', 'Fast results for visual work', 'Great template library'],
    limitations: ['Advanced design work is limited', 'Some features require paid plans', 'Can feel template-driven']
  },
  notion: {
    name: 'Notion AI',
    category: 'Productivity AI',
    initials: 'NA',
    tone: 'tone-gold',
    officialUrl: 'https://www.notion.so/product/ai',
    overview: 'A productivity assistant for organizing notes, summarizing content, and managing projects in one workspace.',
    features: ['Note organization and summaries', 'Task and project planning support', 'Helpful writing assistance'],
    useCases: ['Managing study notes', 'Planning daily tasks', 'Summarizing meeting content'],
    pros: ['All-in-one workspace', 'Useful for personal productivity', 'Keeps work organized'],
    limitations: ['Requires setup to stay organized', 'Some features are premium', 'Can be overwhelming at first']
  },
  grammarly: {
    name: 'Grammarly',
    category: 'Writing AI',
    initials: 'G',
    tone: 'tone-mint',
    officialUrl: 'https://www.grammarly.com',
    overview: 'A writing assistant that improves grammar, spelling, tone, and clarity across everyday documents.',
    features: ['Grammar and spelling checks', 'Tone and clarity suggestions', 'Writing improvement guidance'],
    useCases: ['Editing essays and reports', 'Improving email writing', 'Checking professional messages'],
    pros: ['Easy to use', 'Good for polished writing', 'Works across many contexts'],
    limitations: ['Not a full writing replacement', 'Some suggestions need review', 'Premium features may be limited']
  },
  gemini: {
    name: 'Gemini',
    category: 'Research AI',
    initials: 'GM',
    tone: 'tone-lilac',
    officialUrl: 'https://gemini.google.com',
    overview: 'Google’s AI assistant for answering questions, helping with research, and supporting creative work.',
    features: ['Conversation-based help', 'Research and brainstorming support', 'Useful for general productivity'],
    useCases: ['Exploring ideas quickly', 'Researching topics', 'Getting help with writing'],
    pros: ['Easy to access', 'Strong for general tasks', 'Good for quick exploration'],
    limitations: ['Should be fact-checked', 'Not every answer is detailed', 'May vary by feature availability']
  },
  claude: {
    name: 'Claude',
    category: 'Writing AI',
    initials: 'CL',
    tone: 'tone-coral',
    officialUrl: 'https://claude.ai',
    overview: 'A thoughtful AI assistant that is useful for writing, summarizing, and working through complex prompts.',
    features: ['Long-form response support', 'Summarization and drafting', 'Clear conversational style'],
    useCases: ['Drafting essays or summaries', 'Understanding long documents', 'Brainstorming project ideas'],
    pros: ['Strong writing support', 'Helpful for longer content', 'Good conversation flow'],
    limitations: ['Needs prompt refinement', 'Can still make mistakes', 'Availability may vary by region']
  },
  cursor: {
    name: 'Cursor',
    category: 'Coding AI',
    initials: 'CU',
    tone: 'tone-blue',
    officialUrl: 'https://cursor.com',
    overview: 'An AI-first code editor that helps developers write, refactor, and understand code faster.',
    features: ['AI-assisted code editing', 'Project-aware suggestions', 'Helpful refactoring support'],
    useCases: ['Editing existing projects', 'Learning code structure', 'Refactoring repetitive code'],
    pros: ['Designed for developers', 'Works well with projects', 'Saves time in editing'],
    limitations: ['Requires a coding workflow', 'Can still suggest wrong code', 'Best value comes from practice']
  },
  blackbox: {
    name: 'Blackbox AI',
    category: 'Coding AI',
    initials: 'BB',
    tone: 'tone-amber',
    officialUrl: 'https://www.blackbox.ai',
    overview: 'A coding assistant that helps search, generate, and understand code faster during development.',
    features: ['Code generation support', 'Search-style developer help', 'Quick snippet assistance'],
    useCases: ['Looking up code examples', 'Generating starting code', 'Speeding up routine tasks'],
    pros: ['Useful for quick coding help', 'Simple to start with', 'Good for snippet discovery'],
    limitations: ['Must verify generated code', 'Quality depends on prompt clarity', 'Not a replacement for learning']
  },
  midjourney: {
    name: 'Midjourney',
    category: 'Design AI',
    initials: 'MJ',
    tone: 'tone-emerald',
    officialUrl: 'https://www.midjourney.com',
    overview: 'A creative AI image generator known for producing artistic and highly styled visuals from prompts.',
    features: ['Text-to-image generation', 'Creative style control', 'High-quality visual output'],
    useCases: ['Concept art and inspiration', 'Poster and artwork ideas', 'Mood boards for projects'],
    pros: ['Strong visual quality', 'Great for creative ideas', 'Popular for inspiration'],
    limitations: ['Prompt skill matters', 'Can be less predictable', 'Not ideal for quick utility graphics']
  },
  leonardo: {
    name: 'Leonardo AI',
    category: 'Design AI',
    initials: 'LA',
    tone: 'tone-teal',
    officialUrl: 'https://leonardo.ai',
    overview: 'A design-focused AI tool for generating art, concept visuals, and creative assets with more control.',
    features: ['Image generation workflows', 'Creative asset support', 'Prompt-based visual creation'],
    useCases: ['Creating concept visuals', 'Designing project assets', 'Exploring artistic styles'],
    pros: ['Useful for creative work', 'Flexible visual output', 'Good for experimentation'],
    limitations: ['Requires prompt refinement', 'Output quality can vary', 'May not suit every design need']
  },
  elevenlabs: {
    name: 'ElevenLabs',
    category: 'Audio AI',
    initials: 'EL',
    tone: 'tone-sand',
    officialUrl: 'https://elevenlabs.io',
    overview: 'An AI audio platform that focuses on realistic voice generation and speech tools.',
    features: ['Text-to-speech generation', 'Natural-sounding voice output', 'Audio content creation support'],
    useCases: ['Making narration audio', 'Creating voice samples', 'Building audio prototypes'],
    pros: ['High-quality voice output', 'Useful for creative media', 'Easy to understand purpose'],
    limitations: ['Voice quality depends on input', 'Some features are premium', 'Needs careful use for accuracy']
  },
  suno: {
    name: 'Suno AI',
    category: 'Audio AI',
    initials: 'SU',
    tone: 'tone-aquamarine',
    officialUrl: 'https://suno.com',
    overview: 'A music-generation tool that creates songs and audio ideas from text prompts.',
    features: ['Prompt-based music generation', 'Creative audio exploration', 'Song idea development'],
    useCases: ['Trying out music concepts', 'Generating demo tracks', 'Exploring audio creativity'],
    pros: ['Fun creative tool', 'Fast music ideation', 'Great for experimentation'],
    limitations: ['Output depends on prompt quality', 'Not a full music studio replacement', 'Usage rights should be reviewed']
  },
  gamma: {
    name: 'Gamma',
    category: 'Productivity AI',
    initials: 'GA',
    tone: 'tone-gold',
    officialUrl: 'https://gamma.app',
    overview: 'A presentation and content tool that helps people create polished decks and documents quickly.',
    features: ['Presentation generation', 'Fast content structuring', 'Clean visual output'],
    useCases: ['Making class presentations', 'Preparing project decks', 'Summarizing ideas visually'],
    pros: ['Quick to use', 'Good for polished output', 'Useful for presentations'],
    limitations: ['Can feel template-like', 'Advanced customization is limited', 'Best for simple workflows']
  }
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function setMessage(text, type) {
  if (!formMessage) {
    return;
  }

  formMessage.textContent = text;
  formMessage.classList.remove('is-error', 'is-success');

  if (type) {
    formMessage.classList.add(type);
  }
}

function closeNavigation() {
  if (!siteNav || !navToggle) {
    return;
  }

  siteNav.classList.remove('is-open');
  navToggle.setAttribute('aria-expanded', 'false');
}

function setActiveNav() {
  const currentPage = document.body.dataset.page;

  navLinks.forEach((link) => {
    const isActive = link.dataset.nav === currentPage;
    link.classList.toggle('is-active', isActive);

    if (isActive) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });
}

function renderToolPage() {
  if (!toolSlug) {
    return;
  }

  const tool = tools[toolSlug];

  if (!tool) {
    return;
  }

  document.title = `${tool.name} | AI Toolkit Hub`;

  const nameNodes = document.querySelectorAll('[data-tool-name]');
  const categoryNodes = document.querySelectorAll('[data-tool-category]');
  const overviewNodes = document.querySelectorAll('[data-tool-overview]');
  const featureList = document.querySelector('[data-tool-features]');
  const useCaseList = document.querySelector('[data-tool-usecases]');
  const prosList = document.querySelector('[data-tool-pros]');
  const limitationsList = document.querySelector('[data-tool-limitations]');
  const officialLinks = document.querySelectorAll('[data-official-link]');
  const iconNodes = document.querySelectorAll('[data-tool-icon]');

  nameNodes.forEach((node) => {
    node.textContent = tool.name;
  });

  categoryNodes.forEach((node) => {
    node.textContent = tool.category;
  });

  overviewNodes.forEach((node) => {
    node.textContent = tool.overview;
  });

  iconNodes.forEach((node) => {
    node.textContent = tool.initials;
    node.classList.add(tool.tone);
  });

  officialLinks.forEach((link) => {
    link.href = tool.officialUrl;
  });

  const renderList = (listElement, items) => {
    if (!listElement) {
      return;
    }

    listElement.innerHTML = items.map((item) => `<li>${item}</li>`).join('');
  };

  renderList(featureList, tool.features);
  renderList(useCaseList, tool.useCases);
  renderList(prosList, tool.pros);
  renderList(limitationsList, tool.limitations);
}

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 768) {
        closeNavigation();
      }
    });
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
      closeNavigation();
    }
  });
}

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const nameField = document.getElementById('name');
    const emailField = document.getElementById('email');
    const messageField = document.getElementById('message');

    const name = nameField.value.trim();
    const email = emailField.value.trim();
    const message = messageField.value.trim();

    nameField.value = name;
    emailField.value = email;
    messageField.value = message;

    if (!name || !email || !message) {
      setMessage('Please fill out all fields before submitting.', 'is-error');
      return;
    }

    if (!emailPattern.test(email)) {
      setMessage('Please enter a valid email address.', 'is-error');
      return;
    }

    setMessage('Thanks for your message. The form was submitted successfully.', 'is-success');
    contactForm.reset();
  });
}

setActiveNav();
renderToolPage();
