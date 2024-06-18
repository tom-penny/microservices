// namespace Order.Application.Orders.Sagas;
//
// using MassTransit;
// using Orders.Events;
// using Domain.Events;
// using Payments.Events;
// using Orders.Commands;
// using Domain.Enums;
//
// public class SagaTwo : MassTransitStateMachine<OrderSagaState>
// {
//     public State OrderPending { get; private set; }
//     public State PaymentApproved { get; private set; }
//     public State OrderValidated { get; private set; }
//     public State OrderProcessing
//     
//     public State Pending { get; private set; }
//     public State Processing { get; private set; }
//     public State Complete { get; private set; }
//     public State Failed { get; private set; }
//     
//     public Event<OrderS> OrderSubmitted { get; private set; }
//     public Event<OrderCreated> OrderCreated { get; private set; }
//     public Event<PaymentApproved> PaymentApproved { get; private set; }
//     public Event<PaymentRejectedEvent> PaymentRejected { get; private set; }
//     public Event<OrderValidatedEvent> OrderValidated { get; private set; }
//     public Event<OrderRejectedEvent> OrderRejected { get; private set; }
//     public Event OrderApproved { get; private set; }
//     public Event<ShipmentDispatched> ShipmentDispatched { get; private set; }
//     public Event<ShipmentDelivered> ShipmentDelivered { get; private set; }
//
//     public ProcessOrderSaga()
//     {
//         InstanceState(s => s.CurrentState);
//
//         State(() => Pending);
//         State(() => Processing);
//         State(() => Complete);
//         State(() => Failed);
//
//         State(() => PendingPayment);
//
//         Event(() => OrderApproved);
//         
//         Event(() => OrderSubmitted,
//             e => e.CorrelateBy(state => state.TransactionId, context => context.Message.TransactionId));
//         Event(() => PaymentApproved,
//             e => e.CorrelateBy(state => state.TransactionId, context => context.Message.TransactionId));
//         Event(() => PaymentRejected,
//             e => e.CorrelateBy(state => state.TransactionId, context => context.Message.TransactionId));
//         Event(() => OrderValidated,
//             e => e.CorrelateBy(state => state.OrderId, context => context.Message.OrderId));
//         Event(() => OrderRejected,
//             e => e.CorrelateBy(state => state.OrderId, context => context.Message.OrderId));
//         Event(() => ShipmentDispatched,
//             e => e.CorrelateBy(state => state.OrderId, context => context.Message.Shipment.OrderId));
//         Event(() => ShipmentDelivered,
//             e => e.CorrelateBy(state => state.OrderId, context => context.Message.Shipment.OrderId));
//         Event(() => OrderApproved);
//
//         CompositeEvent(() => OrderApproved, state => state.ApprovalStatus,
//             CompositeEventOptions.IncludeInitial, PaymentConfirmed, OrderValidated);
//
//         Initially(
//             When(OrderSubmitted)
//                 .TransitionTo(Pending)
//                 .Publish(context => new CreateOrderCommand())
//         );
//         
//         During(Pending,
//             When(OrderValidated)
//                 .If(context => !context.Message.IsValid, binder => binder.TransitionTo(Failed)),
//             When(PaymentRejected)
//                 .TransitionTo(Failed),
//             When(OrderApproved)
//                 .TransitionTo(Processing)
//                 .Publish(context => new UpdateStatusCommand(context.Saga.OrderId, OrderStatus.Processing)),
//             When(OrderRejected)
//                 .TransitionTo(Failed)
//                 .Publish(context => new UpdateStatusCommand(context.Saga.OrderId, OrderStatus.Failed))
//                 .Finalize()
//         );
//
//         During(Processing,
//             When(ShipmentDispatched)
//                 .Publish(context => new UpdateStatusCommand(context.Saga.OrderId, OrderStatus.Shipped)),
//             When(ShipmentDelivered)
//                 .TransitionTo(Complete)
//                 .Publish(context => new UpdateStatusCommand(context.Saga.OrderId, OrderStatus.Delivered))
//                 .Finalize()
//         );
//     }
// }