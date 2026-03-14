import { z } from "zod";

export const createTravelRequestSchema = z
  .object({
    userId: z.number({
      error: "userId deve ser um número" 
    }),

    destination: z
      .string()
      .min(2, "Destino deve ter pelo menos 2 caracteres")
      .max(50, "Destino pode ter no máximo 50 caracteres"),

    departureDate: z.coerce.date({
      error: "A data de saída é obrigatória",
    }),

    returnDate: z.coerce.date({
      error: "A data de retorno é obrigatória",
    }),

    overTimeStart: z.coerce.date().optional(),

    overTimeEnd: z.coerce.date().optional(),
  })
  .refine((data) => data.returnDate >= data.departureDate, {
    message: "A data de retorno não pode ser menor que a data de saída",
    path: ["returnDate"],
  })
  .refine(
    (data) => {
      if (!data.overTimeStart && !data.overTimeEnd) return true;
      if (data.overTimeStart && data.overTimeEnd) {
        return data.overTimeEnd >= data.overTimeStart;
      }
      return true;
    },
    {
      message:
        "A hora final da hora extra não pode ser menor que a hora inicial",
      path: ["overTimeEnd"],
    },
  );

export type CreateTravelRequestDTO = z.infer<
  typeof createTravelRequestSchema
>;