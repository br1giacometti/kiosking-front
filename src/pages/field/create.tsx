import { useCallback } from "react";
import { useRouter } from "next/router";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Heading } from "@chakra-ui/react";

import { useTranslation } from "Base/i18n";
import CreateFieldProvider from "Field/contexts/CreateBatchContext/CreateBatchProvider";
import PageLayout from "Base/layout/PageLayout";
import { CreateField } from "Field/features";
import createFieldSchema, {
  CreateFieldSchema,
} from "Field/schemas/createFieldSchema";

const FieldCreatePage = () => {
  const router = useRouter();
  const { t } = useTranslation("field");

  const methods = useForm<CreateFieldSchema>({
    resolver: zodResolver(createFieldSchema),
    defaultValues: {
      description: "",
      hectares: 0,
      batches: [],
    },
  });

  const batchesArrayMethods = useFieldArray({
    control: methods.control, // control props comes from useForm (optional: if you are using FormContext)
    name: "batches", // unique name for your Field Array
  });

  const navigateToField = useCallback(() => router.push("/field"), [router]);

  return (
    <CreateFieldProvider {...methods} batches={batchesArrayMethods}>
      <PageLayout>
        {{
          header: <Heading>{t("create.title")}</Heading>,
          content: <CreateField navigateToField={navigateToField} />,
        }}
      </PageLayout>
    </CreateFieldProvider>
  );
};

export default FieldCreatePage;
