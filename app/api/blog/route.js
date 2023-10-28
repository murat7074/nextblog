//pagination

import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Blog from "@/models/blog";
import queryString from "query-string";

// http://localhost:3000/api/blog?page=2

export async function GET(req) {
  await dbConnect();
  const searchParams = queryString.parseUrl(req.url).query; // ?page=2
  console.log("searchParams => ", searchParams);

  const { page } = searchParams || {};
  const pageSize = 6;

  try {
    // current page
    const currentPage = Number(page) || 1;
    // skip
    const skip = (currentPage - 1) * pageSize;
    // count the blogs
    const totalBlogs = await Blog.countDocuments({});

    const blogs = await Blog.find({})
      .populate("postedBy", "name")
      .skip(skip)
      .limit(pageSize)
      .sort({ createdAt: -1 });

    return NextResponse.json(
      {
        blogs,
        currentPage,
        totalPages: Math.ceil(totalBlogs / pageSize),
      },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}
