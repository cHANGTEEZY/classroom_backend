import { timestamp, pgTable, integer, varchar } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

const timestamps = {
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
};

export const departments = pgTable("departments", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  code: varchar("code", { length: 50 }).notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  description: varchar("description", { length: 500 }),
  ...timestamps,
});

export const subjects = pgTable("subjects", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  departmentId: integer("department_id")
    .references(() => departments.id, {
      onDelete: "restrict", //* restrict deletion if there are subjects linked to the department
    })
    .notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  code: varchar("code", { length: 50 }).notNull().unique(),
  description: varchar("description", { length: 500 }),
  ...timestamps,
});

//* Define the relation between departments and subjects where one department can have many subjects
export const departmentRelations = relations(departments, ({ many }) => ({
  subjects: many(subjects),
}));

//* Define the relation between subjects and departments where each subject belongs to one department
export const subjectRelations = relations(subjects, ({ one, many }) => ({
  department: one(departments, {
    fields: [subjects.departmentId],
    references: [departments.id],
  }),
}));

//? Export types for type-safe queries
export type Department = typeof departments.$inferSelect;
export type NewDepartment = typeof departments.$inferInsert;
