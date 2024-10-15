import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { captureArea } from "../utils/capture-area";
import { randomId } from "../utils/random-id";

interface CreateCardProps {
  config: {
    apiKey: string;
    boardId: string;
    bucketConfig: {
      bucketName: string;
      id: string;
      secret: string;
      url: string;
      region: string;
    };
  };
  card_title: string;
  card_description: string;
  assignees: { id: string; object: string }[];
  selectionCoords: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

export const CreateACard = async ({
  config,
  card_title,
  card_description,
  assignees,
  selectionCoords,
}: CreateCardProps) => {
  const s3 = new S3Client({
    endpoint: config.bucketConfig.url,
    region: config.bucketConfig.region,
    credentials: {
      accessKeyId: config.bucketConfig.id,
      secretAccessKey: config.bucketConfig.secret,
    },
  });

  try {
    const imageBlob = await captureArea(selectionCoords);

    const fileName = `${randomId()}.png`;

    await s3.send(
      new PutObjectCommand({
        Bucket: config.bucketConfig.bucketName,
        Key: fileName,
        Body: imageBlob,
        ContentType: "image/png",
      }),
    );
    const imageUrl = `https://f003.backblazeb2.com/file/${config.bucketConfig.bucketName}/${fileName}`;

    const res = await fetch("/notedtool-api/v1/pages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Notion-Version": "2022-06-28",
        Authorization: `Bearer ${config.apiKey}`,
      },
      body: JSON.stringify({
        parent: {
          type: "database_id",
          database_id: config.boardId,
        },
        properties: {
          Name: {
            title: [{ text: { content: card_title } }],
          },
          Status: {
            select: {
              name: "Not started",
            },
          },
          Assignee: {
            people: [...assignees],
          },
        },
        children: [
          {
            object: "block",
            type: "paragraph",
            paragraph: {
              rich_text: [
                {
                  type: "text",
                  text: {
                    content: card_description,
                  },
                },
              ],
            },
          },
          {
            object: "block",
            type: "image",
            image: {
              type: "external",
              external: {
                url: imageUrl,
              },
            },
          },
        ],
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.log(data);
      console.log(res);
      throw new Error("Failed to create card");
    }

    return data;
  } catch (error) {
    console.error(error);
  }
};
