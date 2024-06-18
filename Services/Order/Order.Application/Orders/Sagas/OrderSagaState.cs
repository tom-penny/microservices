// namespace Order.Application.Orders.Sagas;
//
// using MassTransit;
// using Domain.Entities;
// using Domain.Enums;
//
// public class OrderSagaState : SagaStateMachineInstance
// {
//     public Guid CorrelationId { get; set; }
//     public int CurrentState { get; set; }
//     public OrderId OrderId { get; set; }
//     public TransactionId TransactionId { get; set; }
//     public int ApprovalStatus { get; set; }
//     
//     public decimal TotalValue { get; set; }
//     public decimal? AmountPaid { get; set; }
//     public decimal? OrderValue { get; set; }
//     
//     public PaymentStatus PaymentStatus { get; set; }
//     public bool? IsValidated { get; set; }
// }