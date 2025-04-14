// Code generated by protoc-gen-go-grpc. DO NOT EDIT.
// versions:
// - protoc-gen-go-grpc v1.5.1
// - protoc             v3.21.12
// source: serverapi/tokenizerapi/proto/tokenizerapi.proto

package tokenizerservicepb

import (
	context "context"
	grpc "google.golang.org/grpc"
	codes "google.golang.org/grpc/codes"
	status "google.golang.org/grpc/status"
	emptypb "google.golang.org/protobuf/types/known/emptypb"
)

// This is a compile-time assertion to ensure that this generated file
// is compatible with the grpc package it is being compiled against.
// Requires gRPC-Go v1.64.0 or later.
const _ = grpc.SupportPackageIsVersion9

const (
	TokenizerService_Tokenize_FullMethodName        = "/tokenizerservicepb.TokenizerService/Tokenize"
	TokenizerService_CountTokens_FullMethodName     = "/tokenizerservicepb.TokenizerService/CountTokens"
	TokenizerService_AvailableModels_FullMethodName = "/tokenizerservicepb.TokenizerService/AvailableModels"
	TokenizerService_OptimalModel_FullMethodName    = "/tokenizerservicepb.TokenizerService/OptimalModel"
)

// TokenizerServiceClient is the client API for TokenizerService service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://pkg.go.dev/google.golang.org/grpc/?tab=doc#ClientConn.NewStream.
//
// The main service definition.
type TokenizerServiceClient interface {
	// Tokenizes a given prompt using a specified model.
	Tokenize(ctx context.Context, in *TokenizeRequest, opts ...grpc.CallOption) (*TokenizeResponse, error)
	// Counts the number of tokens in a given prompt for a specified model.
	CountTokens(ctx context.Context, in *CountTokensRequest, opts ...grpc.CallOption) (*CountTokensResponse, error)
	// Lists the names of models currently available to the tokenizer.
	AvailableModels(ctx context.Context, in *emptypb.Empty, opts ...grpc.CallOption) (*AvailableModelsResponse, error)
	// Determines the optimal tokenizer model to use based on a base model name.
	OptimalModel(ctx context.Context, in *OptimalModelRequest, opts ...grpc.CallOption) (*OptimalModelResponse, error)
}

type tokenizerServiceClient struct {
	cc grpc.ClientConnInterface
}

func NewTokenizerServiceClient(cc grpc.ClientConnInterface) TokenizerServiceClient {
	return &tokenizerServiceClient{cc}
}

func (c *tokenizerServiceClient) Tokenize(ctx context.Context, in *TokenizeRequest, opts ...grpc.CallOption) (*TokenizeResponse, error) {
	cOpts := append([]grpc.CallOption{grpc.StaticMethod()}, opts...)
	out := new(TokenizeResponse)
	err := c.cc.Invoke(ctx, TokenizerService_Tokenize_FullMethodName, in, out, cOpts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *tokenizerServiceClient) CountTokens(ctx context.Context, in *CountTokensRequest, opts ...grpc.CallOption) (*CountTokensResponse, error) {
	cOpts := append([]grpc.CallOption{grpc.StaticMethod()}, opts...)
	out := new(CountTokensResponse)
	err := c.cc.Invoke(ctx, TokenizerService_CountTokens_FullMethodName, in, out, cOpts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *tokenizerServiceClient) AvailableModels(ctx context.Context, in *emptypb.Empty, opts ...grpc.CallOption) (*AvailableModelsResponse, error) {
	cOpts := append([]grpc.CallOption{grpc.StaticMethod()}, opts...)
	out := new(AvailableModelsResponse)
	err := c.cc.Invoke(ctx, TokenizerService_AvailableModels_FullMethodName, in, out, cOpts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *tokenizerServiceClient) OptimalModel(ctx context.Context, in *OptimalModelRequest, opts ...grpc.CallOption) (*OptimalModelResponse, error) {
	cOpts := append([]grpc.CallOption{grpc.StaticMethod()}, opts...)
	out := new(OptimalModelResponse)
	err := c.cc.Invoke(ctx, TokenizerService_OptimalModel_FullMethodName, in, out, cOpts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// TokenizerServiceServer is the server API for TokenizerService service.
// All implementations must embed UnimplementedTokenizerServiceServer
// for forward compatibility.
//
// The main service definition.
type TokenizerServiceServer interface {
	// Tokenizes a given prompt using a specified model.
	Tokenize(context.Context, *TokenizeRequest) (*TokenizeResponse, error)
	// Counts the number of tokens in a given prompt for a specified model.
	CountTokens(context.Context, *CountTokensRequest) (*CountTokensResponse, error)
	// Lists the names of models currently available to the tokenizer.
	AvailableModels(context.Context, *emptypb.Empty) (*AvailableModelsResponse, error)
	// Determines the optimal tokenizer model to use based on a base model name.
	OptimalModel(context.Context, *OptimalModelRequest) (*OptimalModelResponse, error)
	mustEmbedUnimplementedTokenizerServiceServer()
}

// UnimplementedTokenizerServiceServer must be embedded to have
// forward compatible implementations.
//
// NOTE: this should be embedded by value instead of pointer to avoid a nil
// pointer dereference when methods are called.
type UnimplementedTokenizerServiceServer struct{}

func (UnimplementedTokenizerServiceServer) Tokenize(context.Context, *TokenizeRequest) (*TokenizeResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method Tokenize not implemented")
}
func (UnimplementedTokenizerServiceServer) CountTokens(context.Context, *CountTokensRequest) (*CountTokensResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method CountTokens not implemented")
}
func (UnimplementedTokenizerServiceServer) AvailableModels(context.Context, *emptypb.Empty) (*AvailableModelsResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method AvailableModels not implemented")
}
func (UnimplementedTokenizerServiceServer) OptimalModel(context.Context, *OptimalModelRequest) (*OptimalModelResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method OptimalModel not implemented")
}
func (UnimplementedTokenizerServiceServer) mustEmbedUnimplementedTokenizerServiceServer() {}
func (UnimplementedTokenizerServiceServer) testEmbeddedByValue()                          {}

// UnsafeTokenizerServiceServer may be embedded to opt out of forward compatibility for this service.
// Use of this interface is not recommended, as added methods to TokenizerServiceServer will
// result in compilation errors.
type UnsafeTokenizerServiceServer interface {
	mustEmbedUnimplementedTokenizerServiceServer()
}

func RegisterTokenizerServiceServer(s grpc.ServiceRegistrar, srv TokenizerServiceServer) {
	// If the following call pancis, it indicates UnimplementedTokenizerServiceServer was
	// embedded by pointer and is nil.  This will cause panics if an
	// unimplemented method is ever invoked, so we test this at initialization
	// time to prevent it from happening at runtime later due to I/O.
	if t, ok := srv.(interface{ testEmbeddedByValue() }); ok {
		t.testEmbeddedByValue()
	}
	s.RegisterService(&TokenizerService_ServiceDesc, srv)
}

func _TokenizerService_Tokenize_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(TokenizeRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(TokenizerServiceServer).Tokenize(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: TokenizerService_Tokenize_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(TokenizerServiceServer).Tokenize(ctx, req.(*TokenizeRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _TokenizerService_CountTokens_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(CountTokensRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(TokenizerServiceServer).CountTokens(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: TokenizerService_CountTokens_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(TokenizerServiceServer).CountTokens(ctx, req.(*CountTokensRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _TokenizerService_AvailableModels_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(emptypb.Empty)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(TokenizerServiceServer).AvailableModels(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: TokenizerService_AvailableModels_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(TokenizerServiceServer).AvailableModels(ctx, req.(*emptypb.Empty))
	}
	return interceptor(ctx, in, info, handler)
}

func _TokenizerService_OptimalModel_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(OptimalModelRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(TokenizerServiceServer).OptimalModel(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: TokenizerService_OptimalModel_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(TokenizerServiceServer).OptimalModel(ctx, req.(*OptimalModelRequest))
	}
	return interceptor(ctx, in, info, handler)
}

// TokenizerService_ServiceDesc is the grpc.ServiceDesc for TokenizerService service.
// It's only intended for direct use with grpc.RegisterService,
// and not to be introspected or modified (even as a copy)
var TokenizerService_ServiceDesc = grpc.ServiceDesc{
	ServiceName: "tokenizerservicepb.TokenizerService",
	HandlerType: (*TokenizerServiceServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "Tokenize",
			Handler:    _TokenizerService_Tokenize_Handler,
		},
		{
			MethodName: "CountTokens",
			Handler:    _TokenizerService_CountTokens_Handler,
		},
		{
			MethodName: "AvailableModels",
			Handler:    _TokenizerService_AvailableModels_Handler,
		},
		{
			MethodName: "OptimalModel",
			Handler:    _TokenizerService_OptimalModel_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "serverapi/tokenizerapi/proto/tokenizerapi.proto",
}
