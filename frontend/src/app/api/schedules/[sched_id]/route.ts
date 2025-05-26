// src/app/api/schedules/[sched_id]/route.ts
import { NextRequest, NextResponse } from "next/server";

interface Params {
  params: {
    sched_id: string;
  };
}

export async function DELETE(
  request: NextRequest,
  { params }: Params
) {
  const sched_id = params.sched_id;

  try {
    // TODO: Add your actual database delete logic here
    // For example, delete from DB where id = sched_id

    console.log(`Deleting schedule with ID: ${sched_id}`);

    // Return success response
    return NextResponse.json(
      { message: "Schedule deleted", sched_id },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete schedule" },
      { status: 500 }
    );
  }
}
