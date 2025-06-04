import { 
  resources, 
  checklistItems, 
  supportGroups, 
  contactRequests,
  type Resource, 
  type InsertResource,
  type ChecklistItem,
  type InsertChecklistItem,
  type SupportGroup,
  type InsertSupportGroup,
  type ContactRequest,
  type InsertContactRequest
} from "@shared/schema";

export interface IStorage {
  // Resources
  getResources(): Promise<Resource[]>;
  getResourcesByCategory(category: string): Promise<Resource[]>;
  getResourcesByPhase(phase: string): Promise<Resource[]>;
  getFeaturedResources(): Promise<Resource[]>;
  getResource(id: number): Promise<Resource | undefined>;
  createResource(resource: InsertResource): Promise<Resource>;

  // Checklist Items
  getChecklistItems(): Promise<ChecklistItem[]>;
  getChecklistItemsByPhase(phase: string): Promise<ChecklistItem[]>;
  getChecklistItemsByWeek(week: number): Promise<ChecklistItem[]>;
  createChecklistItem(item: InsertChecklistItem): Promise<ChecklistItem>;

  // Support Groups
  getSupportGroups(): Promise<SupportGroup[]>;
  getSupportGroupsByType(type: string): Promise<SupportGroup[]>;
  createSupportGroup(group: InsertSupportGroup): Promise<SupportGroup>;

  // Contact Requests
  createContactRequest(request: InsertContactRequest): Promise<ContactRequest>;
  getContactRequests(): Promise<ContactRequest[]>;
}

export class MemStorage implements IStorage {
  private resources: Map<number, Resource>;
  private checklistItems: Map<number, ChecklistItem>;
  private supportGroups: Map<number, SupportGroup>;
  private contactRequests: Map<number, ContactRequest>;
  private currentResourceId: number;
  private currentChecklistId: number;
  private currentSupportGroupId: number;
  private currentContactId: number;

  constructor() {
    this.resources = new Map();
    this.checklistItems = new Map();
    this.supportGroups = new Map();
    this.contactRequests = new Map();
    this.currentResourceId = 1;
    this.currentChecklistId = 1;
    this.currentSupportGroupId = 1;
    this.currentContactId = 1;

    this.initializeData();
  }

  private initializeData() {
    // Initialize sample resources
    const sampleResources: InsertResource[] = [
      {
        title: "Understanding ICU Delirium",
        description: "A comprehensive guide for patients and families about managing confusion and disorientation during recovery.",
        category: "symptom-guides",
        phase: "immediate",
        content: "ICU delirium is a common condition affecting cognitive function during critical care...",
        featured: true
      },
      {
        title: "Family Communication Strategies",
        description: "Tools and techniques for effective communication during the recovery process.",
        category: "downloadable-guides",
        phase: "immediate",
        content: "Effective communication between patients, families, and medical teams is crucial...",
        downloadUrl: "/downloads/communication-guide.pdf",
        featured: true
      },
      {
        title: "Physical Recovery Checklist",
        description: "Step-by-step checklist to track physical recovery milestones.",
        category: "checklists",
        phase: "short-term",
        content: "This checklist helps track your physical recovery progress...",
        featured: false
      },
      {
        title: "Emotional Adjustment Guide",
        description: "Understanding and managing emotional changes during recovery.",
        category: "symptom-guides",
        phase: "short-term",
        content: "Recovery involves not just physical healing but emotional adjustment...",
        featured: false
      },
      {
        title: "Return to Work Planning",
        description: "Comprehensive guide for planning your return to work and daily activities.",
        category: "downloadable-guides",
        phase: "long-term",
        content: "Returning to work after ICU recovery requires careful planning...",
        downloadUrl: "/downloads/return-to-work.pdf",
        featured: false
      }
    ];

    sampleResources.forEach(resource => {
      this.createResource(resource);
    });

    // Initialize sample checklist items
    const sampleChecklistItems: InsertChecklistItem[] = [
      {
        title: "Meet with your primary nurse",
        description: "Establish communication preferences and ask questions",
        phase: "immediate",
        week: 1,
        orderIndex: 1
      },
      {
        title: "Complete orientation assessment",
        description: "Basic cognitive and physical assessment",
        phase: "immediate",
        week: 1,
        orderIndex: 2
      },
      {
        title: "Practice breathing exercises",
        description: "Complete at least 3 guided breathing sessions",
        phase: "immediate",
        week: 1,
        orderIndex: 3
      },
      {
        title: "Begin physical therapy",
        description: "Start with basic mobility exercises",
        phase: "short-term",
        week: 2,
        orderIndex: 1
      },
      {
        title: "Set recovery goals",
        description: "Work with your team to establish short-term goals",
        phase: "short-term",
        week: 2,
        orderIndex: 2
      }
    ];

    sampleChecklistItems.forEach(item => {
      this.createChecklistItem(item);
    });

    // Initialize sample support groups
    const sampleSupportGroups: InsertSupportGroup[] = [
      {
        name: "ICU Recovery Support Group",
        description: "Virtual support group for ICU survivors and their families",
        type: "virtual",
        contactInfo: "support@recoverypath.com",
        schedule: "Tuesdays 7pm PST",
        languages: ["English", "Spanish"]
      },
      {
        name: "Family Caregiver Circle",
        description: "Support group specifically for family members and caregivers",
        type: "virtual",
        contactInfo: "family@recoverypath.com",
        schedule: "Thursdays 6pm PST",
        languages: ["English"]
      },
      {
        name: "Local Recovery Meetup",
        description: "In-person support group in major metropolitan areas",
        type: "local",
        contactInfo: "1-555-SUPPORT",
        schedule: "First Saturday of each month",
        languages: ["English", "Spanish", "Chinese"]
      }
    ];

    sampleSupportGroups.forEach(group => {
      this.createSupportGroup(group);
    });
  }

  // Resource methods
  async getResources(): Promise<Resource[]> {
    return Array.from(this.resources.values());
  }

  async getResourcesByCategory(category: string): Promise<Resource[]> {
    return Array.from(this.resources.values()).filter(
      resource => resource.category === category
    );
  }

  async getResourcesByPhase(phase: string): Promise<Resource[]> {
    return Array.from(this.resources.values()).filter(
      resource => resource.phase === phase
    );
  }

  async getFeaturedResources(): Promise<Resource[]> {
    return Array.from(this.resources.values()).filter(
      resource => resource.featured
    );
  }

  async getResource(id: number): Promise<Resource | undefined> {
    return this.resources.get(id);
  }

  async createResource(insertResource: InsertResource): Promise<Resource> {
    const id = this.currentResourceId++;
    const resource: Resource = { 
      ...insertResource, 
      id,
      createdAt: new Date()
    };
    this.resources.set(id, resource);
    return resource;
  }

  // Checklist methods
  async getChecklistItems(): Promise<ChecklistItem[]> {
    return Array.from(this.checklistItems.values()).sort((a, b) => a.orderIndex - b.orderIndex);
  }

  async getChecklistItemsByPhase(phase: string): Promise<ChecklistItem[]> {
    return Array.from(this.checklistItems.values())
      .filter(item => item.phase === phase)
      .sort((a, b) => a.orderIndex - b.orderIndex);
  }

  async getChecklistItemsByWeek(week: number): Promise<ChecklistItem[]> {
    return Array.from(this.checklistItems.values())
      .filter(item => item.week === week)
      .sort((a, b) => a.orderIndex - b.orderIndex);
  }

  async createChecklistItem(insertItem: InsertChecklistItem): Promise<ChecklistItem> {
    const id = this.currentChecklistId++;
    const item: ChecklistItem = { ...insertItem, id };
    this.checklistItems.set(id, item);
    return item;
  }

  // Support group methods
  async getSupportGroups(): Promise<SupportGroup[]> {
    return Array.from(this.supportGroups.values());
  }

  async getSupportGroupsByType(type: string): Promise<SupportGroup[]> {
    return Array.from(this.supportGroups.values()).filter(
      group => group.type === type
    );
  }

  async createSupportGroup(insertGroup: InsertSupportGroup): Promise<SupportGroup> {
    const id = this.currentSupportGroupId++;
    const group: SupportGroup = { ...insertGroup, id };
    this.supportGroups.set(id, group);
    return group;
  }

  // Contact request methods
  async createContactRequest(insertRequest: InsertContactRequest): Promise<ContactRequest> {
    const id = this.currentContactId++;
    const request: ContactRequest = { 
      ...insertRequest, 
      id,
      createdAt: new Date()
    };
    this.contactRequests.set(id, request);
    return request;
  }

  async getContactRequests(): Promise<ContactRequest[]> {
    return Array.from(this.contactRequests.values());
  }
}

export const storage = new MemStorage();
