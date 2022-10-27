import { BeakerIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { motion } from "framer-motion";

import {
  AppCard as AppCardComponent,
  Badge,
  Button,
  Flex,
} from "../../../library";

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
    className="grow space-y-2 overflow-scroll px-4 pt-4 text-sm"
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
  </motion.div>
);

const complexBadges = ["some", "important", "info", "at a", "glance"];

const Template: ComponentStory<typeof AppCardComponent> = (args) => {
  return (
    <Flex align="center" justify="center" className="h-screen w-screen px-64">
      <Flex wrap="wrap" align="end" justify="evenly" className="w-full gap-4">
        {/* {Array.from({ length: NUM_OF_CARDS }).map((_, i) => (
          <AppCardComponent key={i} {...args} />
        ))} */}
        <AppCardComponent {...args} />
        <AppCardComponent
          containerClassName="flex-[0_0_60%] h-40 rounded-xl ring-2 ring-gray-200 ring-inset"
          firstClassName="w-full h-full bg-blue-800 text-white hover:bg-blue-700 hover:ring-2 hover:ring-offset-2"
          lastClassName="h-2/3 w-2/3 bg-blue-700 text-white overflow-hidden"
          firstChildren={(firstMount) => (
            <Flex
              direction="col"
              justify="between"
              className="h-full w-full p-4"
            >
              <motion.div
                initial={{
                  opacity: firstMount ? 1 : 0,
                }}
                animate={{
                  opacity: 1,
                }}
              >
                <h1 className="text-2xl">App card</h1>
                <p className="text-lg">
                  I'm a <span className="italic">little bit</span> more
                  complicated.
                </p>
              </motion.div>

              <motion.ul
                variants={{
                  initial: {
                    opacity: firstMount ? 1 : 0,
                  },
                  animate: {
                    opacity: 1,
                  },
                }}
                transition={{
                  staggerChildren: 0.2,
                }}
                initial="initial"
                animate="animate"
                className="flex flex-wrap gap-2"
              >
                {complexBadges.map((badge, i) => (
                  <motion.li
                    key={badge}
                    variants={
                      firstMount
                        ? {}
                        : {
                            initial: {
                              x: -20,
                              opacity: 0,
                            },
                            animate: {
                              x: 0,
                              opacity: 1,
                            },
                          }
                    }
                    transition={{
                      ease: "easeOut",
                    }}
                  >
                    <Badge size="xs">{badge}</Badge>
                  </motion.li>
                ))}
              </motion.ul>
            </Flex>
          )}
          borderRadius="xl"
        >
          {(isAnimationComplete, handleClose) => (
            <>
              {isAnimationComplete && (
                <div className="absolute right-0 mr-2 mt-2 h-fit w-fit">
                  <Button onClick={handleClose} color="brand" size="sm">
                    <XMarkIcon className="h-6 w-6" />
                  </Button>
                </div>
              )}
              <Flex direction="col" className="h-full w-full p-4">
                <div>
                  <h1 className="text-2xl">App card</h1>
                  <p className="">
                    I'm a <span className="italic">little bit</span> more
                    complicated.
                  </p>
                </div>
                <motion.p
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: 1,
                  }}
                  transition={{
                    delay: 0.2,
                  }}
                  className="mt-8 text-sm"
                >
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Aliquid praesentium molestiae non unde. Perferendis maxime
                  rerum possimus similique, unde minima natus vitae delectus at
                  dolores earum non? Numquam, eius consequatur.
                  <br />
                  <br />
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta
                  architecto optio obcaecati sit expedita! Corporis quisquam
                  optio quam impedit ad, similique id voluptas quas. Voluptate
                  nostrum necessitatibus amet harum mollitia?
                </motion.p>
                {isAnimationComplete && (
                  <motion.ul
                    variants={{
                      initial: {
                        opacity: isAnimationComplete ? 1 : 0,
                      },
                      animate: {
                        opacity: 1,
                      },
                    }}
                    transition={{
                      staggerChildren: 0.2,
                    }}
                    initial="initial"
                    animate="animate"
                    className="absolute bottom-0 mb-4 flex flex-wrap gap-2"
                  >
                    {complexBadges.map((badge, i) => (
                      <motion.li
                        key={badge}
                        variants={{
                          initial: {
                            y: 20,
                            opacity: 0,
                          },
                          animate: {
                            y: 0,
                            opacity: 1,
                          },
                        }}
                        transition={{
                          ease: "easeOut",
                        }}
                      >
                        <Badge size="xs">{badge}</Badge>
                      </motion.li>
                    ))}
                  </motion.ul>
                )}
              </Flex>
            </>
          )}
        </AppCardComponent>
      </Flex>
    </Flex>
  );
};

export const AppCard = Template.bind({});

AppCard.args = {
  swipeToCloseThreshold: 100,
  containerClassName: "h-20 w-40 ring-2 ring-gray-200 ring-inset rounded-xl",
  firstClassName:
    "h-full w-full bg-blue-800 text-white hover:bg-blue-700 hover:ring-2 hover:ring-offset-2",
  lastClassName: "h-2/3 w-1/2 bg-blue-700 text-white overflow-scroll",
  firstChildren: (firstMount) => (
    <motion.div
      initial={{
        opacity: !firstMount ? 0 : 1,
      }}
      animate={{
        opacity: 1,
      }}
      className="flex h-full w-full flex-col items-center justify-center"
    >
      <p>Click for more!</p>
      <p className="text-xs">edit me below</p>
    </motion.div>
  ),
  borderRadius: "xl",
  children: (isAnimationComplete, handleClose) => {
    return (
      <>
        <Flex direction="col" className="h-full w-full space-y-4 px-4 pt-8">
          <div className="space-y-2 px-4">
            <h1 className="text-3xl">Card title</h1>
            <p className="text-lg">
              I can be closed by dragging up and down or by clicking{" "}
              <button
                onClick={handleClose}
                className="font-bold underline underline-offset-2"
              >
                here
              </button>
              .
            </p>

            <p>This text renders immediately while this...</p>

            {isAnimationComplete && (
              <>
                <motion.p
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: 1,
                  }}
                >
                  renders after the layout is complete
                </motion.p>
                <motion.p
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: 1,
                  }}
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptatem quidem placeat accusamus. Iure exercitationem
                  delectus reiciendis tempora magnam ullam facere molestias ut.
                  Iste est nobis animi, neque debitis libero beatae?
                </motion.p>
              </>
            )}
          </div>
        </Flex>
        {/* <button onClick={handleClose}>close me</button>
        {CARD_BODY} */}
      </>
    );
  },
};
