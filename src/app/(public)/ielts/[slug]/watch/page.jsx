import React from "react";
import CoursePlayer from "./CoursePlayer";

const CourseWatchPage = ({ params }) => {
  return <CoursePlayer slug={params.slug} />;
};

export default CourseWatchPage;
