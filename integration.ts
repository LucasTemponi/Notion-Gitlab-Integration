import axios from "axios";

const instance = axios.create({
  baseURL: "https://git.rarolabs.com.br/api/graphql",
  timeout: 1000,
  headers: { Authorization: `Bearer: ` },
});

const query = {
  query: `query{ 
        project(fullPath: "raro/projeto-alke/alke-web-app") {
            name
            mergeRequests(state: opened) {
                edges {
                   node {
                     id
                     title
                    author {
                      id
                      name
                      username
                    }
                     description
                    }
                }
            }
        }
      }`,
};

async function main() {
  const { Client } = require("@notionhq/client");
  const notion = new Client({
    auth: `secret_uGAFvHVNAGgxtUwuyRHI4mT2vcuZN3l2q0uSH6hLpAc`,
  });

  axios(`https://api.notion.com/v1/search`, {
    headers: {
      Authorization: `Bearer `,
      "Notion-Version": " 2022-06-28",
    },
    method: "POST",
    data: {
      filter: {
        value: "database",
        property: "object",
      },
    },
  }).then(({ data }) => {
    data.results.forEach((item: any) => console.log(item));
  });

  // axios(
  //     `https://git.rarolabs.com.br/api/graphql`,
  //     {
  //         headers :{
  //             Authorization:`Bearer 3kzJvLXpXNgZg5xiuUT9`
  //         },
  //         data: query
  //     }
  // )
  // .then(({data})=>{
  //     data.data.project.mergeRequests.edges.forEach((element:any) => {
  //         console.log(element.node.title,element.node.author)
  //     });
  // })
}

main();

// project(fullPath: "raro/projeto-alke/alke-web-app") {
//     name
//   mergeRequests(state: opened) {
//     edges {
//       node {
//         id
//         title
//         description
//       }
//     }
//   }
// }
