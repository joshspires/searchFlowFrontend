import * as React from "react";
import AccountSetting from "../components/AccountSetting";
import PlanBilling from "../components/PlanBilling";
import MainLayout from "../Layout/MainLayout";

export default function Setting() {
  return (
    <MainLayout>
      <div className=" bg-white mx-5 ">
        <div className="flex flex-col w-full ">
          <div className="flex flex-col mt-5">
            {/* Page Header */}
            <h1 className="self-start text-2xl pr-2 font-semibold text-black">Settings</h1>

            {/* Settings Content */}
            <div className="">
              <AccountSetting />
              <PlanBilling />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
