"use client";

import React from "react";
import Modal from "@/component/components/Modal";
import Signup from "@/component/components/Signup";
function page() {
  console.log("interceptor page");
  return (
    <Modal>
      <Signup />;
    </Modal>
  );
}

export default page;
