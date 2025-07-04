import React, { useState } from "react";
import { useModal } from "@/components/shared/Modal/useModal";
import BasicInfo from "@/pages/BasicInfo";
import UserAddress from "@/pages/UserAddress";
import UserAccess from "@/pages/UserAccess";
import UserPass from "@/pages/UserPass";
import Button from "@/components/shared/Button";

const StepperModal = () => {
  const { ModalUI, open, close } = useModal();
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: "Basic Info",
      component: <BasicInfo onNext={() => setStep(1)} />,
    },
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
      title: "Security",
      component: <UserPass onBack={() => setStep(2)} closeModal={close} />,
    },
  ];

  return (
    <>
      <Button
        onClick={open}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Add User
      </Button>

      <ModalUI modalTitle={steps[step].title} size="md">
        {steps[step].component}
      </ModalUI>
    </>
  );
};

export default StepperModal;
