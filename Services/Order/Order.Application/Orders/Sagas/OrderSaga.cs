//namespace Order.Application.Orders.Sagas;

//using MassTransit;
//using Orders.Events;
//using Payments.Events;
//using Shipments.Events;
//using Domain.Enums;
//using Commands;

//public class OrderSaga : MassTransitStateMachine<OrderSagaState>
//{
//    public State Pending { get; private set; }
//    public State Confirmed { get; private set; }
//    public State Processing { get; private set; }
//    public State Completed { get; private set; }
//    public State Cancelled { get; private set; }

//    public Event<OrderCreatedEvent> CheckoutProcessed { get; private set; }
//    public Event<PaymentCreatedEvent> PaymentProcessed { get; private set; }
//    public Event<OrderValidatedEvent> OrderValidated { get; private set; }
//    public Event<OrderRejectedEvent> OrderRejected { get; private set; }
//    public Event<OrderDeliveredEvent> OrderDelivered { get; private set; }

//    public OrderSaga()
//    {
//        InstanceState(s => s.CurrentState);

//        State(() => Pending);
//        State(() => Confirmed);
//        State(() => Processing);
//        State(() => Completed);
//        State(() => Cancelled);

//        Event(() => CheckoutProcessed,
//            e => e.CorrelateBy(state => state.OrderId, context => context.Message.OrderId));
//        Event(() => PaymentProcessed,
//            e => e.CorrelateBy(state => state.Reference, context => context.Message.Reference));
//        Event(() => OrderValidated,
//            e => e.CorrelateBy(state => state.OrderId, context => context.Message.OrderId));
//        Event(() => OrderRejected,
//            e => e.CorrelateBy(state => state.OrderId, context => context.Message.OrderId));

//        Initially(
//            When(CheckoutProcessed)
//                .Then(context =>
//                {
//                    context.Saga.OrderValue = context.Message.OrderValue;
//                }),
//            When(OrderValidated)
//                .IfElse(context => context.Message.IsValid,
//                    binder => binder.TransitionTo(Pending),
//                    binder => binder.TransitionTo(Cancelled)
//                ),
//            When(PaymentProcessed)
//                .Then(context =>
//                {
//                    context.Saga.PaymentValue = context.Message.PaymentValue;
//                    context.Saga.PaymentStatus = context.Message.PaymentStatus;
//                })
//                .TransitionTo(Confirmed)
//        );

//        During(Pending,
//            When(PaymentProcessed)
//                .IfElse(context => context.Saga.OrderValue != context.Message.PaymentValue
//                    || context.Message.PaymentStatus != PaymentStatus.Approved,
//                    binder => binder.TransitionTo(Cancelled),
//                    binder => binder.TransitionTo(Processing)
//                )
//        );

//        During(Confirmed,
//            When(CheckoutProcessed)
//                .If(context => context.Saga.PaymentValue != context.Message.OrderValue
//                    || context.Saga.PaymentStatus != PaymentStatus.Approved,
//                    binder => binder.TransitionTo(Cancelled)
//                ),
//            When(OrderValidated)
//                .IfElse(context => context.Message.IsValid,
//                    binder => binder.TransitionTo(Processing),
//                    binder => binder.TransitionTo(Cancelled)
//                )
//        );

//        WhenEnter(Processing, binder => binder
//            .Publish(context => new UpdateStatusCommand
//            {
//                OrderId = context.Saga.OrderId,
//                Status = OrderStatus.Processing
//            })
//        );

//        During(Processing,
//            When(OrderDelivered)
//                .TransitionTo(Completed)
//                .Publish(context => new UpdateStatusCommand
//                {
//                    OrderId = context.Saga.OrderId,
//                    Status = OrderStatus.Completed
//                })
//                .Finalize()
//        );

//        WhenEnter(Cancelled, binder => binder
//            .Publish(context => new UpdateStatusCommand
//            {
//                OrderId = context.Saga.OrderId,
//                Status = OrderStatus.Cancelled
//            })
//            .Finalize());

//        SetCompletedWhenFinalized();
//    }
//}