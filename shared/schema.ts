import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const resources = pgTable("resources", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(), // 'symptom-guides', 'checklists', 'downloadable-guides'
  phase: text("phase").notNull(), // 'immediate', 'short-term', 'long-term'
  content: text("content").notNull(),
  downloadUrl: text("download_url"),
  featured: boolean("featured").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const checklistItems = pgTable("checklist_items", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  phase: text("phase").notNull(), // 'immediate', 'short-term', 'long-term'
  week: integer("week").notNull(),
  orderIndex: integer("order_index").notNull(),
});

export const supportGroups = pgTable("support_groups", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  type: text("type").notNull(), // 'virtual', 'local', 'phone'
  contactInfo: text("contact_info").notNull(),
  schedule: text("schedule"),
  languages: text("languages").array(),
});

export const contactRequests = pgTable("contact_requests", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  urgency: text("urgency").notNull(), // 'low', 'medium', 'high'
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertResourceSchema = createInsertSchema(resources).omit({
  id: true,
  createdAt: true,
});

export const insertChecklistItemSchema = createInsertSchema(checklistItems).omit({
  id: true,
});

export const insertSupportGroupSchema = createInsertSchema(supportGroups).omit({
  id: true,
});

export const insertContactRequestSchema = createInsertSchema(contactRequests).omit({
  id: true,
  createdAt: true,
});

export type InsertResource = z.infer<typeof insertResourceSchema>;
export type Resource = typeof resources.$inferSelect;

export type InsertChecklistItem = z.infer<typeof insertChecklistItemSchema>;
export type ChecklistItem = typeof checklistItems.$inferSelect;

export type InsertSupportGroup = z.infer<typeof insertSupportGroupSchema>;
export type SupportGroup = typeof supportGroups.$inferSelect;

export type InsertContactRequest = z.infer<typeof insertContactRequestSchema>;
export type ContactRequest = typeof contactRequests.$inferSelect;
