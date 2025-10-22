"use server";

import { connectToDatabase } from "../db";
import SupportTicket from "../db/models/supportTicket.model";
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

export async function getAllSupportTickets() {
  try {
    await connectToDatabase();
    const tickets = await SupportTicket.find().sort({ createdAt: -1 });
    return { success: true, tickets };
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
