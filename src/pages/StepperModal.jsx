import React, { useState } from "react";
import { useModal } from "@/components/shared/Modal/useModal";
import BasicInfo from "@/pages/BasicInfo";
import UserAddress from "@/pages/UserAddress";
import UserAccess from "@/pages/UserAccess";
import UsersData from "@/pages/UsersData";
import Button from "@/components/shared/Button";

const StepperModal = () => {
  const { ModalUI, open, close } = useModal();
  const [step, setStep] = useState(0);

  const steps = [
    { title: "Basic Info", component: <BasicInfo onNext={() => setStep(1)} /> },
    {
      title: "Address",
      component: (
        <UserAddress onNext={() => setStep(2)} onBack={() => setStep(0)} />
      ),
    },
    {
      title: "Access",
      component: (
        <UserAccess onNext={() => setStep(3)} onBack={() => setStep(1)} />
      ),
    },
    {
      title: "Users",
      component: <UsersData onBack={() => setStep(2)} onClose={close} />,
    },
  ];

  return (
    <>
      <Button
        onClick={open}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Open Stepper Modal
      </Button>

      <ModalUI modalTitle={steps[step].title} size="md">
        {steps[step].component}
      </ModalUI>
    </>
  );
};

export default StepperModal;
