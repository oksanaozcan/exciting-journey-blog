import React from "react";

export default function CommentsGrid () {
  return (
    <div className="container mx-auto max-w-6xl p-2 md:p-10">
      <div className="grid gap-6 grid-cols-1 text-white md:grid-cols-4 md:grid-rows-2">

        {/* box 1 */}
        <div className="relative p-10 rounded-xl bg-purple-700 md:col-span-2">
          <img src="images/quots_mark.svg" alt="#"
            className="absolute top-3 right-10 scale-125 md:top-7 md:right-24 md:scale-150"
          />
          <div className="flex z-10 space-x-4">
            <img src="images/feature.jpg" 
              className="w-10 h-10 roun-full ring-2 ring-purple-300"
            />
            <div className="text-sm">
              <h4 className="opacity-90">Title post or name user</h4>
              <p className="opacity-50">Title post or name user</p>
            </div>            
          </div>
          <p className="relative z-10 mt-6 text-xl">
            The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections "de Finibus Bonorum et Malorum" by Cicero, accompanied by English versions from the 1914 translation by H. Rackham.
          </p>
          <p className="mt-6 opasity-50">
            Contrary to popular belief, Lorem Ipsum i the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
          </p>
        </div>

        {/* box 2 */}
        <div className="p-10 rounded-xl bg-gray-600">         
          <div className="flex space-x-4">
            <img src="images/feature.jpg" 
              className="w-10 h-10 roun-full ring-2 ring-gray-300"
            />
            <div className="text-sm">
              <h4 className="opacity-90">Title post or name user</h4>
              <p className="opacity-50">Title post or name user</p>
            </div>            
          </div>
          <p className="mt-6 text-xl">
            The standard chunk of Lorem Ipsum used since.
          </p>
          <p className="mt-6 opasity-50">
            Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
          </p>
        </div>

        {/* box 3 */}
        <div className="hidden p-10 rounded-xl bg-white text-gray-900 md:block md:row-span-2">         
          <div className="flex space-x-4">
            <img src="images/feature.jpg" 
              className="w-10 h-10 roun-full ring-2 ring-gray-500"
            />
            <div className="text-sm">
              <h4 className="opacity-90">Title post or name user</h4>
              <p className="opacity-50">Title post or name user</p>
            </div>            
          </div>
          <p className="mt-6 text-xl">
            The standard chunk of Lorem Ipsum used since. Sections, accompanied by English versions from the 1914 translation by H. Rackham.
          </p>
          <p className="mt-6 opasity-50">
            Contrary to popular belief, Lorem Ipsum is not simply, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
          </p>
        </div>

        {/* box 4 */}
        <div className="p-10 rounded-xl bg-white text-gray-900">         
          <div className="flex space-x-4">
            <img src="images/feature.jpg" 
              className="w-10 h-10 roun-full ring-2 ring-gray-300"
            />
            <div className="text-sm">
              <h4 className="opacity-90">Title post or name user</h4>
              <p className="opacity-50">Title post or name user</p>
            </div>            
          </div>
          <p className="mt-6 text-xl">
            Simply dummy text of the printing and typesetting industry.
          </p>
          <p className="mt-6 opasity-50">
            Very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
          </p>
        </div>

         {/* box 5 */}
        <div className="p-10 rounded-xl bg-gray-900 md:col-span-2">         
          <div className="flex space-x-4">
            <img src="images/feature.jpg" 
              className="w-10 h-10 roun-full ring-2 ring-gray-300"
            />
            <div className="text-sm">
              <h4 className="opacity-90">Title post or name user</h4>
              <p className="opacity-50">Title post or name user</p>
            </div>            
          </div>
          <p className="mt-6 text-xl">
            The standard chunk of Lorem Ipsum used since. Sections, accompanied by English versions from the 1914 translation by H. Rackham.
          </p>
          <p className="mt-6 opasity-50">
            Contrary to popular belief, Lorem Ipsum is not simply, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
          </p>
        </div>

        {/* box 6 */}
        <div className="p-10 rounded-xl bg-white text-gray-900 md:hidden">         
          <div className="flex space-x-4">
            <img src="images/feature.jpg" 
              className="w-10 h-10 roun-full ring-2 ring-gray-500"
            />
            <div className="text-sm">
              <h4 className="opacity-90">Title post or name user</h4>
              <p className="opacity-50">Title post or name user</p>
            </div>            
          </div>
          <p className="mt-6 text-xl">
          It is a long established fact that a reader will be distracted by the readable content. The standard chunk of Lorem Ipsum used since. Sections, accompanied by English versions from the 1914 translation by H. Rackham.
          </p>
          <p className="mt-6 opasity-50">
            There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary. Contrary to popular belief, Lorem Ipsum is not simply, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
          </p>
        </div>

      </div>
    </div>
  )
}