'use server';
import { auth } from '@/auth';
import { parseServerActionResponse } from './utils';
import slugify from 'slugify';
import { writeClient } from '@/sanity/lib/write-client';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createPtich = async (
  state: any,
  form: FormData,
  pitch: string
) => {
  const session = await auth();
  if (!session) {
    return parseServerActionResponse({
      error: 'Not signed in',
      status: 'ERROR',
    });
  }

  const { title, description, category, link } = Object.fromEntries(
    Array.from(form).filter(([key]) => key !== 'pitch')
  );

  const slug = slugify(title as string, { lower: true, strict: true });

  console.log(typeof session?.id, session?.id);

  try {
    const startup = {
      title,
      description,
      category,
      image: link,
      slug: {
        _type: slug,
        current: slug,
      },
      author: {
        _type: 'reference',
        _ref: session?.id + '',
      },
      pitch,
    };

    const result = await writeClient.create({ _type: 'startup', ...startup });
    return parseServerActionResponse({
      ...result,
      error: '',
      status: 'SUCCESS',
    });
  } catch (error) {
    console.log('start of error');
    console.log(error, 'here is error');
    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: 'ERROR',
    });
  }
};

// "use server";

// import { auth } from "@/auth";
// import { parseServerActionResponse } from "@/lib/utils";
// import slugify from "slugify";
// import { writeClient } from "@/sanity/lib/write-client";

// export const createPitch = async (
//   state: any,
//   form: FormData,
//   pitch: string,
// ) => {
//   const session = await auth();

//   if (!session)
//     return parseServerActionResponse({
//       error: "Not signed in",
//       status: "ERROR",
//     });

//   const { title, description, category, link } = Object.fromEntries(
//     Array.from(form).filter(([key]) => key !== "pitch"),
//   );

//   const slug = slugify(title as string, { lower: true, strict: true });

//   try {
//     const startup = {
//       title,
//       description,
//       category,
//       image: link,
//       slug: {
//         _type: slug,
//         current: slug,
//       },
//       author: {
//         _type: "reference",
//         _ref: session?.id,
//       },
//       pitch,
//     };

//     const result = await writeClient.create({ _type: "startup", ...startup });

//     return parseServerActionResponse({
//       ...result,
//       error: "",
//       status: "SUCCESS",
//     });
//   } catch (error) {
//     console.log(error);

//     return parseServerActionResponse({
//       error: JSON.stringify(error),
//       status: "ERROR",
//     });
//   }
// };