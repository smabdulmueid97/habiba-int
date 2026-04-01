// File: app/api/admin/admissions/route.ts
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Helper function to get the database path
const getFilePath = () => path.join(process.cwd(), 'public', 'Database', 'admission-id.json');

// GET: Fetch all students
export async function GET() {
  try {
    const filePath = getFilePath();
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ success: true, students: [] });
    }
    
    const fileData = fs.readFileSync(filePath, 'utf-8');
    const students = JSON.parse(fileData || '[]');
    
    return NextResponse.json({ success: true, students });
  } catch (error) {
    console.error("Error reading database:", error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}

// PATCH: Update a student's status (Approve)
export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, status } = body; // We expect the student ID and the new status

    const filePath = getFilePath();
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ success: false, message: 'Database not found' }, { status: 404 });
    }

    const fileData = fs.readFileSync(filePath, 'utf-8');
    let students = JSON.parse(fileData || '[]');

    // Find the student and update their status
    let studentFound = false;
    students = students.map((student: any) => {
      if (student.id === id) {
        studentFound = true;
        return { ...student, status: status };
      }
      return student;
    });

    if (!studentFound) {
      return NextResponse.json({ success: false, message: 'Student not found' }, { status: 404 });
    }

    // Save the updated list back to the JSON file
    fs.writeFileSync(filePath, JSON.stringify(students, null, 2));

    return NextResponse.json({ success: true, message: 'Student approved successfully' });
  } catch (error) {
    console.error("Error updating database:", error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}