export class CreateMessageDto {
  private constructor(
    public from: string,
    public to: string,
    public message: string
  ) {}

  static create(object: Record<string, any>): [string?, CreateMessageDto?] {
    const { from, to, message } = object;

    if (!from) return ["Emisor no encontrado"];
    if (!to) return ["Receptor no encontrado"];
    if (!message) return ["Mensaje no encontrado"];

    return [undefined, new CreateMessageDto(from, to, message)];
  }
}
