"use client";
import { useEffect, useState } from "react";
import { Job, jobService } from "@/services/jobService";
import Link from "next/link";

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      const data = await jobService.getAll();
      setJobs(data);
    } catch (error) {
      console.error("Failed to load jobs", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-[#1b0d0d]">Việc làm mới nhất</h1>
        <Link
          href="/jobs/create"
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition"
        >
          Đăng tin tuyển dụng
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-12">Đang tải...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <div
              key={job.jobId}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-[#1b0d0d] line-clamp-2">
                  {job.title}
                </h3>
                <span
                  className={`px-2 py-1 rounded text-xs font-semibold ${
                    job.status === "OPEN"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {job.status}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <span className="material-symbols-outlined text-[18px]">
                    location_on
                  </span>
                  {job.location}
                </div>
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <span className="material-symbols-outlined text-[18px]">
                    attach_money
                  </span>
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(job.budget)}
                </div>
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <span className="material-symbols-outlined text-[18px]">
                    person
                  </span>
                  {job.hirerName}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-end">
                <Link
                  href={`/jobs/${job.jobId}`}
                  className="text-primary font-semibold hover:underline text-sm"
                >
                  Xem chi tiết
                </Link>
              </div>
            </div>
          ))}

          {jobs.length === 0 && (
            <div className="col-span-full text-center py-12 text-gray-500">
              Chưa có việc làm nào được đăng.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
