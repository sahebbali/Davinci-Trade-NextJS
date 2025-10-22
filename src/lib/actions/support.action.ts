"use server";

import SupportTicket from "../db/models/supportTicket.model";
import { connectToDatabase } from "../db";
import { getCurrentUser } from "../getCurrentUser";
export async function createSupportTicket(data: {
  purpose?: string;
  previous_ticket_reff?: string;
  image?: string;
  question?: string;
  date?: string;
  time?: string;
}) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) throw new Error("User not authenticated");
    await connectToDatabase();

    const newTicket = await SupportTicket.create({
      ...data,
      userId: currentUser.userId,
      fullName: currentUser.fullName || "",
      email: currentUser.email || "",
      identity: `TICKET-${Date.now()}`,
      isResponse: false,
    });

    return { success: true, ticket: newTicket };
  } catch (error: any) {
    console.error("Error creating support ticket:", error);
    return { success: false, message: error.message };
  }
}

export async function getAllSupportTickets(
  page: number = 1,
  limit: number = 10
) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) throw new Error("User not authenticated");

    await connectToDatabase();

    const skip = (page - 1) * limit;

    // Fetch paginated tickets
    const tickets = await SupportTicket.find({ userId: currentUser.userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(); // converts Mongoose docs to plain JS objects

    // Count total tickets for pagination
    const total = await SupportTicket.countDocuments({
      userId: currentUser.userId,
    });

    const totalPages = Math.ceil(total / limit);

    return {
      success: true,
      data: tickets,
      total,
      page,
      limit,
      totalPages,
    };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function getSupportTicketById(id: string) {
  try {
    await connectToDatabase();
    const ticket = await SupportTicket.findById(id);
    if (!ticket) return { success: false, message: "Ticket not found" };
    return { success: true, ticket };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function updateSupportTicket(id: string, answer: string) {
  try {
    await connectToDatabase();
    const updated = await SupportTicket.findByIdAndUpdate(
      id,
      { answer, isResponse: true },
      { new: true }
    );

    if (!updated) return { success: false, message: "Ticket not found" };
    return { success: true, ticket: updated };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function deleteSupportTicket(id: string) {
  try {
    await connectToDatabase();
    await SupportTicket.findByIdAndDelete(id);
    return { success: true, message: "Ticket deleted successfully" };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}
