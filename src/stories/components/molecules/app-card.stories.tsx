import { BeakerIcon } from "@heroicons/react/24/outline";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { motion } from "framer-motion";

import { AppCard as AppCardComponent, Flex } from "../../../library";

export default {
  component: AppCardComponent,
} as ComponentMeta<typeof AppCardComponent>;

const NUM_OF_CARDS = 8;

const CARD_BODY = (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{
      opacity: 1,
    }}
    className="grow space-y-2 px-4 pt-4 text-sm"
  >
    <p>
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi quas magni
      eos veniam neque fugit, voluptatum ea culpa facilis esse similique ad
      delectus tempora nesciunt repellat accusantium natus iste? Ipsam!
    </p>
    <p>
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi quas magni
      eos veniam neque fugit, voluptatum ea culpa facilis esse similique ad
      delectus tempora nesciunt repellat accusantium natus iste? Ipsam!
    </p>
    <p>
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi quas magni
      eos veniam neque fugit, voluptatum ea culpa facilis esse similique ad
      delectus tempora nesciunt repellat accusantium natus iste? Ipsam!
    </p>
    <p>
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi quas magni
      eos veniam neque fugit, voluptatum ea culpa facilis esse similique ad
      delectus tempora nesciunt repellat accusantium natus iste? Ipsam!
    </p>
    <p>
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi quas magni
      eos veniam neque fugit, voluptatum ea culpa facilis esse similique ad
      delectus tempora nesciunt repellat accusantium natus iste? Ipsam!
    </p>
  </motion.div>
);

const Template: ComponentStory<typeof AppCardComponent> = (args) => {
  return (
    <Flex align="center" justify="center" className="h-screen w-screen px-64">
      <Flex wrap="wrap" justify="evenly" className="gap-8">
        {Array.from({ length: NUM_OF_CARDS }).map((_, i) => (
          <AppCardComponent key={i} {...args} />
        ))}
        <AppCardComponent
          wrapperClassName="h-20 w-64 rounded-xl ring-2 ring-gray-200 ring-inset"
          cardClassName="h-20 w-64 flex flex-col overflow-hidden origin-center rounded-xl bg-blue-800 text-white hover:ring-2 hover:ring-blue-700 hover:ring-offset-2 transition-[box-shadow,color,background-color,border-color,text-decoration-color,fill,stroke] duration-300 ease-in-out"
          isOpenClassName="h-20 w-64 flex flex-col overflow-hidden origin-center rounded-xl bg-blue-700 text-white"
        >
          {(isOpen, isAnimationComplete) => (
            <>
              <Flex
                align="center"
                justify={isOpen ? "start" : "center"}
                className={`h-20 w-full ${isOpen ? "px-4" : ""}`}
              >
                <BeakerIcon className="h-8 w-8" />
                <motion.div className="ml-4">
                  <h1 className="text-xl font-medium tracking-widest">
                    App card
                  </h1>
                </motion.div>
              </Flex>
              {isAnimationComplete && isOpen && CARD_BODY}
            </>
          )}
        </AppCardComponent>
      </Flex>
    </Flex>
  );
};

export const AppCard = Template.bind({});

AppCard.args = {
  openHeight: 600,
  openWidth: 400,
  swipeToCloseThreshold: 100,
  wrapperClassName: "h-20 w-20 rounded-xl ring-2 ring-gray-200 ring-inset",
  cardClassName:
    "h-20 w-20 flex flex-col overflow-hidden origin-center rounded-xl bg-blue-800 text-white hover:ring-2 hover:ring-blue-700 hover:ring-offset-2 transition-[box-shadow,color,background-color,border-color,text-decoration-color,fill,stroke] duration-300 ease-in-out",
  isOpenClassName:
    "h-20 w-20 flex flex-col overflow-hidden origin-center rounded-xl bg-blue-700 text-white",
  children: (isOpen, isAnimationComplete) => {
    return (
      <>
        <Flex
          align="center"
          justify="center"
          className={
            isOpen && !isAnimationComplete
              ? "h-full w-full"
              : !isOpen
              ? "h-20 w-full"
              : "h-fit w-full py-4"
          }
        >
          <BeakerIcon className="h-8 w-8" />
          {isAnimationComplete && isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
              }}
              className="ml-4"
            >
              <h1 className="text-3xl font-medium tracking-widest">App card</h1>
            </motion.div>
          )}
        </Flex>
        {isAnimationComplete && isOpen && CARD_BODY}
      </>
    );
  },
};
