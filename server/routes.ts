import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactRequestSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Resources API
  app.get("/api/resources", async (req, res) => {
    try {
      const { category, phase, featured } = req.query;
      
      let resources;
      if (featured === 'true') {
        resources = await storage.getFeaturedResources();
      } else if (category) {
        resources = await storage.getResourcesByCategory(category as string);
      } else if (phase) {
        resources = await storage.getResourcesByPhase(phase as string);
      } else {
        resources = await storage.getResources();
      }
      
      res.json(resources);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch resources" });
    }
  });

  app.get("/api/resources/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const resource = await storage.getResource(id);
      
      if (!resource) {
        return res.status(404).json({ message: "Resource not found" });
      }
      
      res.json(resource);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch resource" });
    }
  });

  // Checklist API
  app.get("/api/checklist", async (req, res) => {
    try {
      const { phase, week } = req.query;
      
      let items;
      if (phase) {
        items = await storage.getChecklistItemsByPhase(phase as string);
      } else if (week) {
        items = await storage.getChecklistItemsByWeek(parseInt(week as string));
      } else {
        items = await storage.getChecklistItems();
      }
      
      res.json(items);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch checklist items" });
    }
  });

  // Support Groups API
  app.get("/api/support-groups", async (req, res) => {
    try {
      const { type } = req.query;
      
      let groups;
      if (type) {
        groups = await storage.getSupportGroupsByType(type as string);
      } else {
        groups = await storage.getSupportGroups();
      }
      
      res.json(groups);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch support groups" });
    }
  });

  // Contact API
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactRequestSchema.parse(req.body);
      const contactRequest = await storage.createContactRequest(validatedData);
      
      res.status(201).json({ 
        message: "Contact request submitted successfully",
        id: contactRequest.id 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid request data",
          errors: error.errors 
        });
      }
      res.status(500).json({ message: "Failed to submit contact request" });
    }
  });

  // Search API
  app.get("/api/search", async (req, res) => {
    try {
      const { q } = req.query;
      if (!q || typeof q !== 'string') {
        return res.status(400).json({ message: "Search query is required" });
      }
      
      const query = q.toLowerCase();
      const resources = await storage.getResources();
      
      const searchResults = resources.filter(resource => 
        resource.title.toLowerCase().includes(query) ||
        resource.description.toLowerCase().includes(query) ||
        resource.content.toLowerCase().includes(query)
      );
      
      res.json(searchResults);
    } catch (error) {
      res.status(500).json({ message: "Search failed" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
